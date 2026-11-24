import axios, { AxiosError } from 'axios'
import type { GitHubUser, GitHubIssue, GitHubSearchResult, ApiError } from '../types'

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

function toApiError(err: unknown): ApiError {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 0
    const rateLimited =
      status === 403 || status === 429
        ? /rate limit/i.test(String(err.response?.data?.message ?? '')) ||
          status === 429 ||
          err.response?.headers?.['x-ratelimit-remaining'] === '0'
        : false
    const notFound = status === 404
    const network = !err.response
    const message =
      (err.response?.data as { message?: string } | undefined)?.message ||
      err.message ||
      'Erro desconhecido ao contatar a API do GitHub.'
    return { status, message, rateLimited, notFound, network }
  }
  return {
    status: 0,
    message: err instanceof Error ? err.message : 'Erro desconhecido.',
    rateLimited: false,
    notFound: false,
    network: true,
  }
}

export { toApiError }

export async function fetchUser(username: string): Promise<GitHubUser> {
  const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`)
  return data
}

export async function fetchRepoIssues(
  owner: string,
  repo: string,
  page: number,
  perPage: number,
): Promise<{ items: GitHubIssue[]; hasNext: boolean }> {
  const { data, headers } = await api.get<GitHubIssue[]>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
    {
      params: {
        state: 'all',
        sort: 'created',
        direction: 'desc',
        per_page: perPage,
        page,
      },
    },
  )
  // Filter out pull requests (issues endpoint can include PRs)
  const items = data.filter((i) => !i.pull_request)
  const link = headers.link as string | undefined
  const hasNext = !!link && link.includes('rel="next"')
  return { items, hasNext }
}

export async function searchIssues(
  owner: string,
  repo: string,
  query: string,
  page: number,
  perPage: number,
): Promise<{ items: GitHubIssue[]; totalCount: number; hasNext: boolean }> {
  const trimmed = query.trim()
  const q = trimmed
    ? `is:issue repo:${owner}/${repo} ${trimmed}`
    : `is:issue repo:${owner}/${repo}`
  const { data, headers } = await api.get<GitHubSearchResult>('/search/issues', {
    params: {
      q,
      sort: 'created',
      order: 'desc',
      per_page: perPage,
      page,
    },
  })
  const items = (data.items ?? []).filter((i) => !i.pull_request)
  const link = headers.link as string | undefined
  const hasNext = !!link && link.includes('rel="next"')
  // Fallback when no Link header: estimate from total_count
  const estimatedHasNext =
    hasNext || items.length === perPage && page * perPage < (data.total_count ?? 0)
  return { items, totalCount: data.total_count ?? items.length, hasNext: estimatedHasNext }
}

export async function fetchIssue(
  owner: string,
  repo: string,
  number: number,
): Promise<GitHubIssue> {
  const { data } = await api.get<GitHubIssue>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${number}`,
  )
  return data
}

export function isRateLimited(err: unknown): boolean {
  return toApiError(err).rateLimited
}