# TECH_SPEC — GitHub Blog

## 1. Stack

- React 19 + TypeScript 7
- Vite 8 (bundler/dev server)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router 7
- Axios
- react-markdown + remark-gfm
- lucide-react (ícones)
- oxlint (lint)

## 2. Arquitetura

SPA client-side. Sem backend. Dados vêm da API pública do GitHub.

```
src/
  config.ts              # owner, repo, per_page, debounce, metadados
  types.ts               # tipos TS (GitHubUser, GitHubIssue, ApiError, ApiState)
  services/github.ts     # Axios instance + fetchUser, fetchRepoIssues, searchIssues, fetchIssue, toApiError
  hooks/                 # useDebounce, useUser, useIssues, useIssue
  components/            # Header, ProfileCard, SearchBar, IssueCard, Pagination, StateViews, ErrorBoundary
  pages/                 # Home, Post, NotFound
  utils/                 # date (relativa), markdown (excerpt), index
  App.tsx                # Router + ErrorBoundary + skip link
  main.tsx               # bootstrap
  index.css              # Tailwind theme + markdown styles + banner pattern
```

## 3. Integração com a API do GitHub

Base: `https://api.github.com`. Axios instance com `Accept: application/vnd.github+json`
e `X-GitHub-Api-Version: 2022-11-28`, timeout 15 s.

| Função | Endpoint | Uso |
| --- | --- | --- |
| `fetchUser` | `GET /users/{username}` | Perfil na Home |
| `fetchRepoIssues` | `GET /repos/{o}/{r}/issues?state=all&sort=created&direction=desc&per_page&page` | Listagem (busca vazia) |
| `searchIssues` | `GET /search/issues?q=is:issue repo:{o}/{r} {termo}` | Busca textual |
| `fetchIssue` | `GET /repos/{o}/{r}/issues/{number}` | Detalhe do post |

Pull requests são filtrados (`!i.pull_request`). Paginação real via header `Link`
(`rel="next"`).

## 4. Estado e dados

- `ApiState<T>`: `idle | loading | success | error`.
- Hooks encapsulam fetch + retry + normalização de erro (`toApiError`).
- `useDebounce<T>(value, delay)` para a busca (500 ms).
- Nova busca reinicia na página 1 (reset em `onChange`).

## 5. Roteamento

`BrowserRouter` com rotas `/`, `/post/:number`, `*` (NotFound). Acesso direto a
`/post/:number` funciona (SPA fallback via Vercel rewrites).

## 6. Estilização

Tailwind v4 com tema em `@theme` (cores, fontes, raios). Cores principais:
`page #0c1421`, `card #121b2a`, `card-soft #182130`, `accent #6c93eb`,
`text-muted #8b949e`. Banner com padrão de linhas técnicas (CSS/SVG). Markdown
estilizado em `.markdown-body`.

## 7. Tratamento de erros

- `toApiError` normaliza AxiosError → `{status, message, rateLimited, notFound, network}`.
- `ErrorState` distingue 404, rate limit (403/429), erro de rede e vazio, com
  botão "Tentar novamente".
- `ErrorBoundary` captura erros inesperados.

## 8. Acessibilidade

- Skip link "Pular para o conteúdo".
- Labels em busca, `aria-label`/`aria-live`/`aria-current`.
- Foco visível (`:focus-visible`).
- Contraste ≥ 4.5:1.
- Lighthouse: A11y 1.0, Best Practices 1.0, SEO 1.0.

## 9. Deploy

- Vercel: `vercel.json` com `buildCommand`, `outputDirectory: dist`,
  `framework: vite` e rewrite `/* → /index.html` (SPA fallback).
- Sem variáveis de ambiente (API pública).

## 10. Configuração

`src/config.ts`: `GITHUB_USERNAME`, `GITHUB_REPO`, `POSTS_PER_PAGE` (6),
`SEARCH_DEBOUNCE_MS` (500).<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: TECH_SPEC.md