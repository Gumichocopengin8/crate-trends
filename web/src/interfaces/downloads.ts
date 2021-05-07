/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Downloads {
  version_downloads: VersionDownloads[];
  meta: DownloadsMeta;
}

export interface VersionDownloads {
  date: string; // this date is originally Struct chrono::naive::NaiveDate in Rust which doesnt have timezone
  downloads: number;
  version: number;
}

export interface DownloadsMeta {
  extra_downloads: ExtraDownloads[];
}

export interface ExtraDownloads {
  date: string; // this date is originally Struct chrono::naive::NaiveDate in Rust which doesnt have timezone
  downloads: number;
}
