/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
mod agent;
use actix_cors::Cors;
use actix_web::{http::header, middleware::Logger, web, App, HttpResponse, HttpServer};
use agent::generate_async_client;
use anyhow::Result;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let host: String = std::env::var("HOST")
        .unwrap_or_else(|_| "0.0.0.0".to_string())
        .parse()
        .expect("HOST must be a string");

    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");

    if host == "127.0.0.1" {
        println!("Server Start: http://localhost:{}", port);
    } else {
        println!("{}:{}", host, port);
    }

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_origin("https://crate-trends.herokuapp.com")
            .allowed_origin_fn(|origin, _req_head| origin.as_bytes().ends_with(b".vercel.app"))
            .allowed_methods(vec!["GET"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .route("/up", web::get().to(index))
            .service(
                web::scope("/api/v1/crates")
                    .route("/{id}", web::get().to(get_crate_data))
                    .route("/{id}/downloads", web::get().to(get_crate_recent_downloads)),
            )
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}

async fn index() -> HttpResponse {
    HttpResponse::Ok().body("You're up!!")
}

async fn get_crate_data(path: web::Path<String>) -> HttpResponse {
    let crate_name = path.into_inner();
    let crate_data = fetch_crate(&crate_name).await;
    match crate_data {
        Ok(value) => HttpResponse::Ok().json(value),
        Err(_) => HttpResponse::Ok().json(()),
    }
}

// get the number of a crate downloads within last 90 days
// it doesnt actually download data to local
async fn get_crate_recent_downloads(path: web::Path<String>) -> HttpResponse {
    let crate_name = path.into_inner();
    let download_data = fetch_recent_downloads(&crate_name).await;
    match download_data {
        Ok(value) => HttpResponse::Ok().json(value),
        Err(_) => HttpResponse::Ok().json(()),
    }
}

async fn fetch_crate(crate_name: &str) -> Result<crates_io_api::CrateResponse> {
    // Retrieve download data.
    let data = generate_async_client()?.get_crate(crate_name).await?;
    print!("sdf {crate_name}");
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
    use actix_web::{
        http::{self, header::ContentType},
        test,
        web::Bytes,
    };
    use crates_io_api::{CrateDownloads, CrateResponse};

    /// Unit tests

    #[actix_web::test]
    async fn test_index_ok() {
        let res = index().await;
        assert_eq!(res.status(), http::StatusCode::OK);
    }

    #[actix_web::test]
    async fn test_get_crate_data_ok() {
        let path: web::Path<String> = web::Path::from("tokio".to_string());
        let res = get_crate_data(path).await;
        assert_eq!(res.status(), http::StatusCode::OK);
    }

    #[actix_web::test]
    async fn test_get_crate_recent_downloads_ok() {
        let path: web::Path<String> = web::Path::from("tokio".to_string());
        let res = get_crate_recent_downloads(path).await;
        assert_eq!(res.status(), http::StatusCode::OK);
    }

    // --------------------

    /// Integration Tests

    #[actix_web::test]
    async fn test_index_get() {
        let app = test::init_service(App::new().route("/", web::get().to(index))).await;
        let req = test::TestRequest::default()
            .insert_header(ContentType::plaintext())
            .to_request();
        let res = test::call_service(&app, req).await;
        assert!(res.status().is_success());
        let result = test::read_body(res).await;
        assert_eq!(result, Bytes::from_static(b"You're up!!"));
    }

    #[actix_web::test]
    async fn test_get_crate_data_get() {
        let app =
            test::init_service(App::new().route("/{id}", web::get().to(get_crate_data))).await;
        let req = test::TestRequest::get().uri("/tokio").to_request();
        let res: CrateResponse = test::call_and_read_body_json(&app, req).await;
        assert_eq!(res.crate_data.id, "tokio");
    }

    #[actix_web::test]
    async fn test_get_crate_recent_downloads_get() {
        let app = test::init_service(
            App::new().route("/{id}/downloads", web::get().to(get_crate_recent_downloads)),
        )
        .await;
        let req = test::TestRequest::get()
            .uri("/tokio/downloads")
            .to_request();
        let res: CrateDownloads = test::call_and_read_body_json(&app, req).await;
        assert!(!res.version_downloads.is_empty());
    }
}
