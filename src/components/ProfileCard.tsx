import { Building2, MapPin, Users } from 'lucide-react'
import type { GitHubUser } from '../types'

interface Props {
  user: GitHubUser
}

export function ProfileCard({ user }: Props) {
  const name = user.name || user.login
  const bio = user.bio || 'Sem bio cadastrada.'
  const company = user.company
  const location = user.location
  const blog = user.blog

  return (
    <section
      aria-label="Perfil do autor"
      className="relative -mt-16 sm:-mt-20 mx-auto w-full max-w-[864px] px-4 sm:px-0"
    >
      <div className="rounded-card bg-card shadow-lg border border-border p-5 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6">
        <img
          src={user.avatar_url}
          alt={`Avatar de ${name}`}
          width={148}
          height={148}
          className="h-[112px] w-[112px] sm:h-[148px] sm:w-[148px] rounded-avatar object-cover shrink-0 border border-border"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{name}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent hover:underline shrink-0"
              aria-label="Ver perfil no GitHub"
            >
              GITHUB
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
          <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed line-clamp-3">
            {bio}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
            {user.login && (
              <span className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                {user.login}
              </span>
            )}
            {company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} aria-hidden="true" />
                {company}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                {location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} aria-hidden="true" />
              {user.followers} {user.followers === 1 ? 'seguidor' : 'seguidores'}
            </span>
            {blog && (
              <a
                href={blog.startsWith('http') ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                {blog}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}