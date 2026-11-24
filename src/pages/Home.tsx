import { useState } from 'react'
import { Header } from '../components/Header'
import { ProfileCard } from '../components/ProfileCard'
import { SearchBar } from '../components/SearchBar'
import { IssueCard } from '../components/IssueCard'
import { Pagination } from '../components/Pagination'
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews'
import { useUser } from '../hooks/useUser'
import { useIssues } from '../hooks/useIssues'
import { useDebounce } from '../hooks/useDebounce'
import { GITHUB_USERNAME, GITHUB_REPO, POSTS_PER_PAGE, SEARCH_DEBOUNCE_MS } from '../config'

export function Home() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS)

  const { state: userState, retry: retryUser } = useUser(GITHUB_USERNAME)
  const { state: issuesState, retry: retryIssues } = useIssues(
    GITHUB_USERNAME,
    GITHUB_REPO,
    debouncedQuery,
    page,
    POSTS_PER_PAGE,
  )

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => setPage((p) => p + 1)

  return (
    <div className="min-h-screen">
      <Header />

      {userState.status === 'loading' && (
        <div className="mx-auto max-w-[864px] px-4 -mt-16">
          <LoadingState label="Carregando perfil…" />
        </div>
      )}
      {userState.status === 'error' && (
        <div className="mx-auto max-w-[864px] px-4 -mt-16">
          <ErrorState error={userState.error} onRetry={retryUser} />
        </div>
      )}
      {userState.status === 'success' && <ProfileCard user={userState.data} />}

      <main className="mx-auto w-full max-w-[864px] px-4 sm:px-0 pb-16 mt-8 sm:mt-10">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          loading={issuesState.status === 'loading'}
          countLabel={
            issuesState.status === 'success' && issuesState.data.totalCount !== null
              ? `${issuesState.data.totalCount} resultado${issuesState.data.totalCount === 1 ? '' : 's'}`
              : issuesState.status === 'success'
                ? `${issuesState.data.items.length} ${issuesState.data.items.length === 1 ? 'publicação' : 'publicações'}`
                : undefined
          }
        />

        <div className="mt-6">
          {issuesState.status === 'loading' && <LoadingState label="Carregando posts…" />}

          {issuesState.status === 'error' && (
            <ErrorState error={issuesState.error} onRetry={retryIssues} />
          )}

          {issuesState.status === 'success' && issuesState.data.items.length === 0 && (
            <EmptyState
              title={issuesState.data.isSearch ? 'Nenhum resultado' : 'Nenhuma publicação'}
              description={
                issuesState.data.isSearch
                  ? `Nenhuma issue encontrada para "${debouncedQuery.trim()}".`
                  : 'Este repositório ainda não possui issues.'
              }
            />
          )}

          {issuesState.status === 'success' && issuesState.data.items.length > 0 && (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 list-none p-0 m-0">
                {issuesState.data.items.map((issue) => (
                  <li key={issue.number}>
                    <IssueCard issue={issue} />
                  </li>
                ))}
              </ul>
              <Pagination
                page={issuesState.data.page}
                hasNext={issuesState.data.hasNext}
                hasPrev={issuesState.data.hasPrev}
                onPrev={handlePrev}
                onNext={handleNext}
                loading={false}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}