import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Erro inesperado.' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
          <AlertTriangle size={40} className="text-red-400" aria-hidden="true" />
          <h1 className="text-xl font-bold">Algo deu errado</h1>
          <p className="text-sm text-text-muted max-w-md">
            {this.state.message}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-input border border-border bg-card text-sm font-medium hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <RefreshCw size={14} aria-hidden="true" />
            Tentar novamente
          </button>
        </div>
      )
    }
    return this.props.children
  }
}