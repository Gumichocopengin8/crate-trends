use js_sys::JsString;
use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// #[derive(Debug)]
// pub struct VersionDownloads {
//     date: String,
//     downloads: usize,
//     version: usize,
// }

// #[wasm_bindgen]
// #[derive(Debug)]
// pub struct Downloads {
//     version_downloads: Vec<VersionDownloads>,
// }

// #[wasm_bindgen]
// #[derive(Debug)]
// struct ChartSubData {
//     name: String,
//     downloads: Vec<usize>,
// }

// #[wasm_bindgen]
// #[derive(Debug)]
// pub struct ChartData {
//     dates: Vec<String>,
//     data: Vec<ChartSubData>,
// }

// #[wasm_bindgen]
// #[derive(Debug)]
// pub struct Input {
//     downloads: Downloads,
//     crate_names: Vec<String>,
// }

// #[wasm_bindgen]
// pub fn uniform_data(input: &Input) -> ChartData {
//     unimplemented!()
// }

#[wasm_bindgen]
pub fn test_array(input: Vec<JsString>) -> Vec<JsString> {
    input
}

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
