import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, MessageSquare, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from '../components/Header'
import { LoadingState, ErrorState } from '../components/StateViews'
import { useIssue } from '../hooks/useIssue'
import { relativeDate, formatDate } from '../utils/date'
import { GITHUB_USERNAME, GITHUB_REPO } from '../config'

export function Post() {
  const { number } = useParams<{ number: string }>()
  const navigate = useNavigate()
  const issueNumber = number ? Number(number) : null

  const { state, retry } = useIssue(GITHUB_USERNAME, GITHUB_REPO, issueNumber)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-[864px] px-4 sm:px-0 pb-16 mt-8 sm:mt-10">
        {state.status === 'loading' && <LoadingState label="Carregando post…" />}

        {state.status === 'error' && (
          <ErrorState error={state.error} onRetry={retry} />
        )}

        {state.status === 'success' && (
          <article>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded"
                aria-label="Voltar"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Voltar
              </button>
              <a
                href={state.data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded"
                aria-label="Ver no GitHub"
              >
                Ver no GitHub
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-card bg-card border border-border p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                {state.data.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {state.data.user.login}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" />
                  {formatDate(state.data.created_at)}
                  <span className="text-text-dim">({relativeDate(state.data.created_at)})</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare size={14} aria-hidden="true" />
                  {state.data.comments} {state.data.comments === 1 ? 'comentário' : 'comentários'}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-card bg-card-soft border border-border p-5 sm:p-8">
              {state.data.body ? (
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {state.data.body}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-text-muted italic">Este post não possui conteúdo.</p>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent hover:underline"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Voltar para a home
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  )
}