/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
use actix_cors::Cors;
use actix_web::{http::header, middleware::Logger, web, App, HttpResponse, HttpServer};
use crates_io_api::{AsyncClient, Error};

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
    App::new()
      .wrap(
        Cors::new()
          .allowed_origin("http://localhost:3000")
          .allowed_origin("https://crate-trends.herokuapp.com")
          .allowed_methods(vec!["GET"])
          .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
          .allowed_header(header::CONTENT_TYPE)
          .max_age(3600)
          .finish(),
      )
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
  let crate_data = fetch_crate(&path.0).await;
  match crate_data {
    Ok(value) => HttpResponse::Ok().json(value),
    Err(_) => HttpResponse::Ok().json(()),
  }
}

// get the number of a crate downloads within last 90 days
// it doesnt actually download data to local
async fn get_crate_recent_downloads(path: web::Path<String>) -> HttpResponse {
  let download_data = fetch_recent_downloads(&path.0).await;
  match download_data {
    Ok(value) => HttpResponse::Ok().json(value),
    Err(_) => HttpResponse::Ok().json(()),
  }
}

async fn fetch_crate(crate_name: &str) -> Result<crates_io_api::CrateResponse, Error> {
  // Instantiate the client.
  let client = AsyncClient::new(
    "my-user-agent (my-contact@domain.com)",
    std::time::Duration::from_millis(1000),
  )?;

  // Retrieve download data.
  let data = client.get_crate(crate_name).await?;
  let val = serde_json::to_value(data).unwrap();
  let full_crate: crates_io_api::CrateResponse = serde_json::from_value(val).unwrap();
  Ok(full_crate)
}

async fn fetch_recent_downloads(crate_name: &str) -> Result<crates_io_api::Downloads, Error> {
  // Instantiate the client.
  let client = AsyncClient::new(
    "my-user-agent (my-contact@domain.com)",
    std::time::Duration::from_millis(1000),
  )?;

  // Retrieve download data.
  let data = client.crate_downloads(crate_name).await?;
  let val = serde_json::to_value(data).unwrap();
  let downloads: crates_io_api::Downloads = serde_json::from_value(val).unwrap();
  Ok(downloads)
}
