import { useCallback, useEffect, useState } from 'react'
import { fetchUser, toApiError } from '../services/github'
import type { GitHubUser, ApiState, ApiError } from '../types'

export function useUser(username: string) {
  const [state, setState] = useState<ApiState<GitHubUser>>({ status: 'idle' })

  const load = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const data = await fetchUser(username)
      setState({ status: 'success', data })
    } catch (err) {
      setState({ status: 'error', error: toApiError(err) as ApiError })
    }
  }, [username])

  useEffect(() => {
    void load()
  }, [load])

  return { state, retry: load }
}