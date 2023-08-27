use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct VersionDownloads {
    pub date: String,
    pub downloads: usize,
    version: usize,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Downloads {
    pub version_downloads: Vec<VersionDownloads>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ChartSubData {
    pub name: String,
    pub downloads: Vec<usize>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ChartData {
    pub dates: Vec<String>,
    pub data: Vec<ChartSubData>,
}
