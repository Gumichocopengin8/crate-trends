use actix_web::{web, App, HttpResponse, HttpServer};
use crates_io_api::{AsyncClient, Error};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  print!("localhost:8080");

  HttpServer::new(|| {
    App::new().service(
      web::scope("/crates")
        .route("/{id}", web::get().to(get_crate_data))
        .route("/{id}/downloads", web::get().to(get_crate_downloads)),
    )
  })
  .bind("127.0.0.1:8080")?
  .run()
  .await
}

async fn get_crate_data(path: web::Path<(String,)>) -> HttpResponse {
  let downloads = fetch_crate(&path.0).await.unwrap();
  HttpResponse::Ok().json(downloads)
}

// get the number of a crate downloads
// it doesnt actually download data to local
async fn get_crate_downloads(path: web::Path<(String,)>) -> HttpResponse {
  let downloads = fetch_downloads(&path.0).await.unwrap();
  HttpResponse::Ok().json(downloads)
}

async fn fetch_downloads(crate_name: &str) -> Result<crates_io_api::Downloads, Error> {
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
