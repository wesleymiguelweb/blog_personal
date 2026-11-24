import { useCallback, useEffect, useState } from 'react'
import { fetchIssue, toApiError } from '../services/github'
import type { GitHubIssue, ApiState, ApiError } from '../types'

export function useIssue(owner: string, repo: string, number: number | null) {
  const [state, setState] = useState<ApiState<GitHubIssue>>({ status: 'idle' })

  const load = useCallback(async () => {
    if (number === null || Number.isNaN(number)) {
      setState({ status: 'error', error: { status: 404, message: 'Número inválido.', rateLimited: false, notFound: true, network: false } })
      return
    }
    setState({ status: 'loading' })
    try {
      const data = await fetchIssue(owner, repo, number)
      setState({ status: 'success', data })
    } catch (err) {
      setState({ status: 'error', error: toApiError(err) as ApiError })
    }
  }, [owner, repo, number])

  useEffect(() => {
    void load()
  }, [load])

  return { state, retry: load }
}