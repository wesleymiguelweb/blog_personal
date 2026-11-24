export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  html_url: string
  followers: number
  following: number
  public_repos: number
  company: string | null
  blog: string | null
  location: string | null
  created_at: string
}

export interface GitHubIssue {
  number: number
  title: string
  body: string | null
  state: 'open' | 'closed'
  created_at: string
  updated_at: string
  closed_at: string | null
  comments: number
  html_url: string
  user: {
    login: string
    avatar_url: string
    html_url: string
  }
  labels: { name: string; color: string }[]
  pull_request?: unknown
}

export interface GitHubSearchResult {
  total_count: number
  incomplete_results: boolean
  items: GitHubIssue[]
}

export interface ApiError {
  status: number
  message: string
  rateLimited: boolean
  notFound: boolean
  network: boolean
}

export type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError }