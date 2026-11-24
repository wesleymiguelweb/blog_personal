import { AlertTriangle, RefreshCw, Inbox, Clock } from 'lucide-react'
import type { ApiError } from '../types'

interface LoadingProps {
  label?: string
}
export function LoadingState({ label = 'Carregando…' }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16 text-text-muted"
    >
      <div className="h-8 w-8 rounded-full border-2 border-border border-t-accent animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

interface ErrorProps {
  error: ApiError
  onRetry?: () => void
}
export function ErrorState({ error, onRetry }: ErrorProps) {
  let title = 'Algo deu errado'
  let detail = error.message
  let icon = <AlertTriangle size={32} className="text-red-400" aria-hidden="true" />

  if (error.rateLimited) {
    title = 'Limite de requisições atingido'
    detail =
      'A API do GitHub limitou as requisições. Aguarde alguns minutos e tente novamente.'
    icon = <Clock size={32} className="text-amber-400" aria-hidden="true" />
  } else if (error.notFound) {
    title = 'Não encontrado'
    detail = 'O recurso solicitado não existe (404).'
  } else if (error.network) {
    title = 'Falha de rede'
    detail = 'Não foi possível contatar a API do GitHub. Verifique sua conexão.'
  }

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4"
    >
      {icon}
      <h3 className="text-base font-bold">{title}</h3>
      <p className="text-sm text-text-muted max-w-md">{detail}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-input border border-border bg-card text-sm font-medium hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Tentar novamente
        </button>
      )}
    </div>
  )
}

interface EmptyProps {
  title?: string
  description?: string
}
export function EmptyState({
  title = 'Nenhum resultado',
  description = 'Tente outro termo de busca.',
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4">
      <Inbox size={32} className="text-text-dim" aria-hidden="true" />
      <h3 className="text-base font-bold">{title}</h3>
      <p className="text-sm text-text-muted max-w-md">{description}</p>
    </div>
  )
}