/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CrateName(Vec<String>);

impl CrateName {
  pub fn new(val: Vec<String>) -> CrateName {
    CrateName(val)
  }
}
