export interface GitlabCommit {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  trailers: any;
  extended_trailers: any;
  web_url: string;
  parsedCommitDate: string;
}

export interface GitlabRelease {
  name: string;
  tag_name: string;
  description: string;
  created_at: string;
  released_at: string;
  upcoming_release: boolean;
  author: Author;
  commit: Commit;
  commit_path: string;
  tag_path: string;
  assets: Assets;
  evidences: any[];
  _links: Links;
}

export interface Links {
  closed_issues_url: string;
  closed_merge_requests_url: string;
  merged_merge_requests_url: string;
  opened_issues_url: string;
  opened_merge_requests_url: string;
  self: string;
}

export interface Assets {
  count: number;
  sources: any[];
  links: any[];
}

export interface Author {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
}

export interface Commit {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: any[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  trailers: Trailers;
  extended_trailers: Trailers;
  web_url: string;
}

export interface Trailers {}
