export interface IGithubReleaseParsedResponse {
  latestRelease: string | null;
  releases: ReleaseItem[];
}

export interface GithubRawResponseRelease {
  data: ReleaseItem[];
}
export interface ReleaseItem {
  url: string | null;
  assets_url: string | null;
  upload_url: string | null;
  html_url: string | null;
  id: number | null;
  author: any;
  node_id: string | null;
  tag_name: string | null;
  target_commitish: string | null;
  name: string | null;
  draft: boolean;
  prerelease: boolean;
  created_at: string | null;
  published_at: string | null;
  assets: any;
  tarball_url: string | null;
  zipball_url: string | null;
  body?: string | null | undefined;
}
