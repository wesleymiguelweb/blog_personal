const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

export function relativeDate(iso: string, now: number = Date.now()): string {
  const date = new Date(iso).getTime()
  const diff = now - date
  if (Number.isNaN(date)) return ''
  if (diff < MINUTE) return 'agora mesmo'
  if (diff < HOUR) {
    const n = Math.floor(diff / MINUTE)
    return n === 1 ? 'há 1 minuto' : `há ${n} minutos`
  }
  if (diff < DAY) {
    const n = Math.floor(diff / HOUR)
    return n === 1 ? 'há 1 hora' : `há ${n} horas`
  }
  if (diff < WEEK) {
    const n = Math.floor(diff / DAY)
    return n === 1 ? 'há 1 dia' : `há ${n} dias`
  }
  if (diff < MONTH) {
    const n = Math.floor(diff / WEEK)
    return n === 1 ? 'há 1 semana' : `há ${n} semanas`
  }
  if (diff < YEAR) {
    const n = Math.floor(diff / MONTH)
    return n === 1 ? 'há 1 mês' : `há ${n} meses`
  }
  const n = Math.floor(diff / YEAR)
  return n === 1 ? 'há 1 ano' : `há ${n} anos`
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}