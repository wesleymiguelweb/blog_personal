# TASKS_SPEC — GitHub Blog

## Fase 1 — Setup e dependências
- [x] Criar projeto Vite + React + TS (template existente).
- [x] Instalar Tailwind CSS 4 + `@tailwindcss/vite`.
- [x] Instalar React Router, Axios, react-markdown, remark-gfm, lucide-react.
- [x] Configurar `vite.config.ts` e `index.html` (lang pt-BR).

## Fase 2 — Tipos, serviço e hooks
- [x] `types.ts` (GitHubUser, GitHubIssue, ApiError, ApiState).
- [x] `services/github.ts` (Axios + 4 funções + `toApiError`).
- [x] `hooks/useDebounce`, `useUser`, `useIssues`, `useIssue`.
- [x] `config.ts` (username, repo, per_page, debounce).

## Fase 3 — Componentes
- [x] Header (banner + logo).
- [x] ProfileCard (avatar, nome, bio, @username, seguidores, link).
- [x] SearchBar (label, input, loading).
- [x] IssueCard (título, data relativa, resumo, comentários).
- [x] Pagination (Anterior/Próxima, disabled).
- [x] StateViews (Loading, Error, Empty).

## Fase 4 — Páginas e rotas
- [x] Home (perfil + busca + grid + paginação).
- [x] Post (detalhe + Markdown + Voltar + Ver no GitHub).
- [x] NotFound (404).
- [x] App (Router + ErrorBoundary + skip link).

## Fase 5 — GitHub (dados reais)
- [x] Criar repositório público `blog_personal`.
- [x] Criar 12 issues autorais em Markdown.
- [x] Fechar 2 issues (demonstrar `state=all`).
- [x] Atualizar bio do perfil.

## Fase 6 — Qualidade
- [x] Build (`tsc -b && vite build`) passando.
- [x] Lint (oxlint) sem erros.
- [x] Teste manual no navegador (Home, busca, paginação, Post, 404, acesso direto, vazio).
- [x] Lighthouse: A11y 1.0, Best Practices 1.0, SEO 1.0.
- [x] Contraste, skip link, aria-current, meta description, robots.txt.

## Fase 7 — Documentação e entrega
- [x] README.md (setup, config, SPEC, stack, estrutura).
- [x] PRD_SPEC.md.
- [x] TECH_SPEC.md.
- [x] TASKS_SPEC.md.
- [x] AI_USAGE.md (evidências de uso de IA).
- [x] Commit e push para GitHub.
- [ ] Deploy na Vercel (pendente de importação via dashboard).

## Fase 8 — Deploy (pendente)
- [ ] Importar repo no dashboard da Vercel.
- [ ] Validar URL de produção.
- [ ] (Opcional) Configurar domínio customizado.