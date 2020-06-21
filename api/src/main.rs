use actix_cors::Cors;
use actix_web::{http::header, middleware::Logger, web, App, HttpResponse, HttpServer};
use crates_io_api::{AsyncClient, Error};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  println!("http://localhost:8080");
  std::env::set_var("RUST_LOG", "actix_web=info");
  env_logger::init();

  let port = std::env::var("PORT")
    .unwrap_or_else(|_| "8080".to_string())
    .parse()
    .expect("PORT must be a number");

  HttpServer::new(|| {
    App::new()
      .wrap(
        Cors::new()
          .allowed_origin("http://localhost:3000")
          .allowed_methods(vec!["GET"])
          .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
          .allowed_header(header::CONTENT_TYPE)
          .max_age(3600)
          .finish(),
      )
      .wrap(Logger::default())
      .service(
        web::scope("/api/v1/crates")
          .route("/{id}", web::get().to(get_crate_data))
          .route("/{id}/downloads", web::get().to(get_crate_recent_downloads)),
      )
  })
  .bind(("0.0.0.0", port))?
  .run()
  .await
}

async fn get_crate_data(path: web::Path<(String,)>) -> HttpResponse {
  let crate_data = fetch_crate(&path.0).await;
  match crate_data {
    Ok(value) => HttpResponse::Ok().json(value),
    Err(_) => HttpResponse::Ok().json(()),
  }
}

// get the number of a crate downloads within last 90 days
// it doesnt actually download data to local
async fn get_crate_recent_downloads(path: web::Path<(String,)>) -> HttpResponse {
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
