use crates_io_api::{AsyncClient, Error};

/// Instantiate the client.
pub fn generate_async_client() -> Result<AsyncClient, Error> {
    let client = AsyncClient::new(
        "my-user-agent (my-contact@domain.com)",
        std::time::Duration::from_millis(1000),
    )?;
    Ok(client)
}
