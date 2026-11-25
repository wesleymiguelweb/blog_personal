import { Link } from 'react-router-dom'
import { MessageSquare, Calendar } from 'lucide-react'
import { relativeDate, excerptFromMarkdown } from '../utils'
import type { GitHubIssue } from '../types'

interface Props {
  issue: GitHubIssue
}

export function IssueCard({ issue }: Props) {
  const excerpt = excerptFromMarkdown(issue.body, 160)

  return (
    <article className="group">
      <Link
        to={`/post/${issue.number}`}
        className="block h-full rounded-card bg-card-soft border border-border p-5 sm:p-6 transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
            {issue.title}
          </h3>
          <time
            dateTime={issue.created_at}
            className="text-xs text-text-dim shrink-0 whitespace-nowrap pt-0.5"
          >
            {relativeDate(issue.created_at)}
          </time>
        </div>
        <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-4 min-h-[4.5em]">
          {excerpt || 'Sem conteúdo.'}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-text-dim">
          <span className="inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            {issue.user.login}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare size={12} aria-hidden="true" />
            {issue.comments} {issue.comments === 1 ? 'comentário' : 'comentários'}
          </span>
          {issue.state === 'closed' && (
            <span className="inline-flex items-center gap-1.5 text-green-400">
              <Calendar size={12} aria-hidden="true" />
              fechada
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}