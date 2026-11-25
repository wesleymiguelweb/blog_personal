interface Props {
  page: number
  hasNext: boolean
  hasPrev: boolean
  onPrev: () => void
  onNext: () => void
  loading?: boolean
}

export function Pagination({ page, hasNext, hasPrev, onPrev, onNext, loading }: Props) {
  return (
    <nav
      aria-label="Paginação de posts"
      className="flex items-center justify-center gap-3 mt-8"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev || loading}
        className="px-4 py-2 rounded-input border border-border bg-card text-sm font-medium text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        ← Anterior
      </button>
      <span className="text-sm text-text-dim" aria-live="polite" aria-current="page">
        Página {page}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext || loading}
        className="px-4 py-2 rounded-input border border-border bg-card text-sm font-medium text-text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Próxima →
      </button>
    </nav>
  )
}