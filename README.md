# GitHub Blog

Blog pessoal construído como SPA em React + TypeScript + Vite, que consome a
**API pública do GitHub**. O perfil do autor é apresentado no topo e as
**issues** de um repositório público funcionam como posts.

- Repositório de dados: [`wesleymiguelweb/blog_personal`](https://github.com/wesleymiguelweb/blog_personal)
- Perfil: [`wesleymiguelweb`](https://github.com/wesleymiguelweb)

## Funcionalidades (Product SPEC)

- **RF-01/RF-02** — Perfil via `GET /users/{username}`: avatar, nome, bio,
  `@username`, seguidores e link de perfil (com fallback para campos nulos).
- **RF-03** — Repositório público `blog_personal` com 12 issues autorais em
  Markdown (2 fechadas para demonstrar filtro `state=all`).
- **RF-04** — Listagem das issues mais recentes em ordem decrescente de
  criação quando a busca está vazia.
- **RF-05** — Busca textual via **Search API** do GitHub (`/search/issues`).
- **RF-06** — Debounce de 500 ms na busca; nova busca reinicia na página 1.
- **RF-07** — Paginação real por `page`/`per_page` (6 por página).
- **RF-08** — Cards com título, data relativa, resumo do corpo e nº de
  comentários.
- **RF-09/RF-10** — Rota dinâmica `/post/:number` com requisição individual
  (`GET /repos/{owner}/{repo}/issues/{number}`), inclusive em acesso direto.
- **RF-11** — Corpo do post renderizado em Markdown (`react-markdown` +
  `remark-gfm`).
- **RF-12** — Cabeçalho detalhado (título, autor, data, comentários, "Ver no
  GitHub") e ação "Voltar".
- **RF-13** — Estados de loading, erro HTTP e resultados vazios, com ação
  "Tentar novamente".
- **RF-14** — Tratamento de limite de requisições (403/429) com mensagem
  compreensível.
- **RF-15** — Interface responsiva com Tailwind CSS.
- **RF-16** — Acessibilidade (labels, foco visível, contraste) e rota 404.

## Regras de negócio atendidas

- **RN-03** — Busca inclui o qualificador `is:issue`.
- **RN-04** — Busca vazia usa `/repos/{owner}/{repo}/issues?state=all&sort=created&direction=desc`;
  busca textual exige a Search API.
- **RN-05** — Paginação real no servidor (não fatias locais).
- **RN-06** — Termo normalizado com `trim()` e enviado via `params` do Axios
  (sem concatenação insegura).
- **RN-07** — Resumos são texto puro (Markdown removido) truncado; conteúdo
  ausente exibe mensagem; links Markdown renderizados com segurança.
- **RN-08** — Distingue 404, rate limit, erro de rede e consulta sem
  resultados; falha não deixa loading eterno.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router 7
- Axios
- react-markdown + remark-gfm
- lucide-react

## Configuração

Edite `src/config.ts`:

```ts
export const GITHUB_USERNAME = 'wesleymiguelweb'
export const GITHUB_REPO = 'blog_personal'
export const POSTS_PER_PAGE = 6
export const SEARCH_DEBOUNCE_MS = 500
```

## Como rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run preview   # preview do build
```

## Estrutura

```
src/
  config.ts
  types.ts
  services/github.ts        # chamadas à API do GitHub
  hooks/                    # useDebounce, useUser, useIssues, useIssue
  components/               # Header, ProfileCard, SearchBar, IssueCard, Pagination, StateViews
  pages/                    # Home, Post, NotFound
  utils/                    # date, markdown
```

## Observações

- Nenhum token é exposto no frontend; as requisições são anônimas
  (limite de 60 req/hora por IP).
- As issues são a fonte dos posts; o app não possui backend próprio.
- A busca reinicia na página 1 e possui debounce de 500 ms.
- O limite de requisições é tratado com mensagem amigável e ação
  "Tentar novamente".
```