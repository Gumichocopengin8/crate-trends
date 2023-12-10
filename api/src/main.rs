/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
mod agent;
use agent::generate_async_client;
use anyhow::Result;
use axum::{
    extract::Path,
    http::{
        header::{ACCEPT, AUTHORIZATION},
        request, HeaderValue, Method, StatusCode,
    },
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use std::time::Duration;
use tower_http::{
    cors::{AllowOrigin, CorsLayer},
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let host: String = std::env::var("HOST")
        .unwrap_or_else(|_| "0.0.0.0".to_string())
        .parse()
        .expect("HOST must be a string");

    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");

    let listener = tokio::net::TcpListener::bind(format!("{host}:{port}"))
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app()).await.unwrap();
}

fn app() -> Router {
    Router::new()
        .route("/up", get(|| async { "You're up!!" }))
        .route("/api/v1/crates/:id", get(get_crate_data))
        .route(
            "/api/v1/crates/:id/downloads",
            get(get_crate_recent_downloads),
        )
        .layer(
            CorsLayer::new()
                .allow_origin(AllowOrigin::predicate(
                    |origin: &HeaderValue, _request_parts: &request::Parts| {
                        origin.as_bytes() == b"http://localhost:3000"
                            || origin.as_bytes().ends_with(b".vercel.app")
                    },
                ))
                .allow_methods([Method::GET])
                .allow_headers([AUTHORIZATION, ACCEPT])
                .max_age(Duration::from_secs(60) * 5),
        )
        .layer(TraceLayer::new_for_http())
}

async fn get_crate_data(Path(id): Path<String>) -> impl IntoResponse {
    let crate_name = id;
    let crate_data = fetch_crate(&crate_name).await;
    match crate_data {
        Ok(value) => Json(value).into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}

async fn get_crate_recent_downloads(Path(id): Path<String>) -> impl IntoResponse {
    let crate_name = id;
    let download_data = fetch_recent_downloads(&crate_name).await;
    match download_data {
        Ok(value) => Json(value).into_response(),
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
    }
}

async fn fetch_crate(crate_name: &str) -> Result<crates_io_api::CrateResponse> {
    // Retrieve download data.
    let data = generate_async_client()?.get_crate(crate_name).await?;
    let val = serde_json::to_value(data)?;
    let full_crate: crates_io_api::CrateResponse = serde_json::from_value(val)?;
    Ok(full_crate)
}

async fn fetch_recent_downloads(crate_name: &str) -> Result<crates_io_api::CrateDownloads> {
    // Retrieve download data.
    let data = generate_async_client()?.crate_downloads(crate_name).await?;
    let val = serde_json::to_value(data)?;
    let downloads: crates_io_api::CrateDownloads = serde_json::from_value(val)?;
    Ok(downloads)
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::{
        body::Body,
        extract::Path,
        http::{self, Request, StatusCode},
    };
    use http_body_util::BodyExt; // for `collect`
    use tower::ServiceExt; // for `call`, `oneshot`, and `ready`

    /// Unit tests

    #[tokio::test]
    async fn should_get_crate_data_ok() {
        let path = Path("futures".to_string());
        let res = get_crate_data(path).await.into_response();
        assert_eq!(res.status(), http::StatusCode::OK);
    }

    #[tokio::test]
    async fn should_get_crate_recent_downloads_ok() {
        let path = Path("futures".to_string());
        let res = get_crate_data(path).await.into_response();
        assert_eq!(res.status(), http::StatusCode::OK);
    }

    /// Integration Tests

    #[tokio::test]
    async fn should_health_check() {
        let app = app();

        let response = app
            .oneshot(Request::builder().uri("/up").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);
        let body = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(body, "You're up!!");
    }

    #[tokio::test]
    async fn should_get_tokio_crate_info() {
        let app = app();

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/api/v1/crates/tokio")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn should_not_exist_url() {
        let app = app();

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/api/v1/notexist")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::NOT_FOUND);
    }
}
