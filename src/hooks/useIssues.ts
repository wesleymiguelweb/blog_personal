import { useCallback, useEffect, useState } from 'react'
import { fetchRepoIssues, searchIssues, toApiError } from '../services/github'
import type { GitHubIssue, ApiState, ApiError } from '../types'

export interface IssuesPage {
  items: GitHubIssue[]
  page: number
  hasNext: boolean
  hasPrev: boolean
  totalCount: number | null
  isSearch: boolean
}

export function useIssues(
  owner: string,
  repo: string,
  query: string,
  page: number,
  perPage: number,
) {
  const [state, setState] = useState<ApiState<IssuesPage>>({ status: 'idle' })

  const load = useCallback(async () => {
    setState({ status: 'loading' })
    const isSearch = query.trim().length > 0
    try {
      if (isSearch) {
        const res = await searchIssues(owner, repo, query, page, perPage)
        setState({
          status: 'success',
          data: {
            items: res.items,
            page,
            hasNext: res.hasNext,
            hasPrev: page > 1,
            totalCount: res.totalCount,
            isSearch: true,
          },
        })
      } else {
        const res = await fetchRepoIssues(owner, repo, page, perPage)
        setState({
          status: 'success',
          data: {
            items: res.items,
            page,
            hasNext: res.hasNext,
            hasPrev: page > 1,
            totalCount: null,
            isSearch: false,
          },
        })
      }
    } catch (err) {
      setState({ status: 'error', error: toApiError(err) as ApiError })
    }
  }, [owner, repo, query, page, perPage])

  useEffect(() => {
    void load()
  }, [load])

  return { state, retry: load }
}