import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="banner-pattern relative w-full" style={{ minHeight: '220px' }}>
      <div className="tech-lines" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-4 py-10 sm:py-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-accent font-bold tracking-wide focus:outline-none"
          aria-label="GitHub Blog — página inicial"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="4 7 10 12 4 17" />
            <line x1="12" y1="17" x2="20" y2="17" />
          </svg>
          <span className="text-base sm:text-lg">GITHUB BLOG</span>
        </Link>
      </div>
    </header>
  )
}