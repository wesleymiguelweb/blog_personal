import { Search, Loader2 } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
  loading?: boolean
  countLabel?: string
}

export function SearchBar({ value, onChange, loading, countLabel }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Publicações</h2>
        {countLabel && (
          <span className="text-sm text-text-dim">{countLabel}</span>
        )}
      </div>
      <label htmlFor="search-input" className="sr-only">
        Buscar conteúdo
      </label>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="search-input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar conteúdo"
          aria-label="Buscar conteúdo"
          className="w-full h-12 pl-11 pr-11 rounded-input bg-input border border-border text-text placeholder:text-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
        />
        {loading && (
          <Loader2
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim animate-spin"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}