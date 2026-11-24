import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-[864px] px-4 sm:px-0 pb-16 mt-16 text-center">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <p className="mt-4 text-text-muted">Página não encontrada.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
        >
          Voltar para a home
        </Link>
      </main>
    </div>
  )
}