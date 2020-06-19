export interface CrateResponse {
  categories: Category[];
  crate_data: Crate;
  keywords: Keyword[];
  versions: Version[];
}

export interface Category {
  category: string;
  crates_cnt: number;
  created_at: Date;
  description: string;
  id: string;
  slug: string;
}

export interface Crate {
  id: string;
  name: string;
  description?: string;
  license?: string;
  documentation?: string;
  homepage?: string;
  repository?: string;
  downloads: number;
  recent_downloads?: number;
  categories?: string[];
  keywords?: string[];
  versions?: number[];
  max_version: string;
  links: CrateLinks;
  created_at: Date;
  updated_at: Date;
  exact_match?: boolean;
}

export interface CrateLinks {
  owner_team: string;
  owner_user: string;
  owners: string;
  reverse_dependencies: string;
  version_downloads: string;
  versions?: string;
}

export interface Keyword {
  id: string;
  keyword: string;
  crates_cnt: number;
  created_at: Date;
}

export interface Version {
  crate_name: string;
  created_at: Date;
  updated_at: Date;
  dl_path: string;
  downloads: number;
  features: Record<string, string[]>;
  id: number;
  num: string;
  yanked: boolean;
  license?: string;
  readme_path?: string;
  links: VersionLinks;
  crate_size?: number;
  published_by?: User;
}

export interface VersionLinks {
  authors: string;
  dependencies: string;
  version_downloads: string;
}

export interface User {
  avatar?: string;
  email?: string;
  id: number;
  kind?: string;
  login: string;
  name?: string;
  url: string;
}
