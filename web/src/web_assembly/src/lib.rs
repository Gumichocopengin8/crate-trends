mod types;

use chrono::{Duration, Local};
use js_sys::JsString;
use std::collections::BTreeMap;
use types::{ChartData, ChartSubData, Downloads};
use wasm_bindgen::prelude::*;

const ERROR: &str = "Error to aggregate data";

#[wasm_bindgen]
pub fn uniform_data(
    crate_names: Vec<JsString>,
    crate_download_data_results: &str,
) -> Result<JsValue, JsValue> {
    let parsed_data: Result<Vec<Downloads>, _> = serde_json::from_str(crate_download_data_results);
    if let Ok(crate_download_data) = parsed_data {
        let mut dates: Vec<String> = Vec::with_capacity(91);
        let end_date = Local::now();
        let mut start_date = end_date - Duration::days(89);

        while start_date.timestamp() <= end_date.timestamp() {
            dates.push(start_date.format("%Y-%m-%d").to_string());
            start_date += Duration::days(1);
        }

        //  Map<crateName, Map<date, downlowd num>>
        let mut map: BTreeMap<String, BTreeMap<String, usize>> = BTreeMap::new();

        crate_download_data
            .iter()
            .enumerate()
            .for_each(|(index, val)| {
                let mut v_map: BTreeMap<String, usize> = BTreeMap::new();
                for date in &dates {
                    v_map.insert(date.to_string(), 0);
                }
                for v in &val.version_downloads {
                    v_map.insert(
                        v.date.to_string(),
                        *v_map.get(&v.date).unwrap_or(&0) + v.downloads,
                    );
                }
                if let Some(ele) = crate_names.get(index) {
                    map.insert(ele.into(), v_map);
                }
            });

        let data = ChartData {
            dates,
            data: crate_names
                .iter()
                .filter_map(|name| {
                    let name_str: String = name.into();
                    if let Some(m) = map.get(&name_str) {
                        let chart_sub_data_list = if map.contains_key(&name_str) {
                            let mut sort = m.keys().cloned().collect::<Vec<_>>();
                            sort.sort();
                            let a = sort
                                .iter()
                                .filter_map(|x| m.get(x))
                                .copied()
                                .collect::<Vec<_>>();
                            a
                        } else {
                            Vec::new()
                        };
                        return Some(ChartSubData {
                            name: name.into(),
                            downloads: chart_sub_data_list,
                        });
                    }
                    None
                })
                .collect::<Vec<_>>(),
        };
        let json_string = serde_json::to_string(&data);
        return match json_string {
            Ok(json) => Ok(JsValue::from_str(&json)),
            Err(_) => Err(JsValue::from_str(ERROR)),
        };
    }
    Err(JsValue::from_str(ERROR))
}
