/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
use anyhow::Result;
use crates_io_api::AsyncClient;

/// Instantiate the client.
pub fn generate_async_client() -> Result<AsyncClient> {
    let client = AsyncClient::new(
        "my-user-agent (my-contact@domain.com)",
        std::time::Duration::from_millis(1000),
    )?;
    Ok(client)
}
