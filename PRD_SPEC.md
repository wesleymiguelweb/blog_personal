# PRD — GitHub Blog (blog pessoal)

## 1. Visão e objetivo

Transformar um repositório público do GitHub em um pequeno **blog SPA**. O
perfil do autor é apresentado no topo; as **issues** do repositório representam
os posts. Cada post pode ser pesquisado, listado e lido integralmente **sem
recarregar a aplicação** (SPA).

**Objetivos de aprendizagem:** SPA, componentes, Props, `useState`, `useEffect`,
custom Hooks, TypeScript, consumo de APIs REST com Axios, tratamento de
respostas/erros, busca, paginação, React Router, Markdown, responsividade,
acessibilidade, organização do código, documentação, Git/GitHub e uso crítico
de IA.

Não há backend próprio, banco de dados, autenticação nem edição de posts pela
aplicação. A fonte de dados é a **API pública do GitHub**, com dados reais do
repositório do aluno.

## 2. Usuário-alvo

Leitor interessado nos posts (issues) do autor. O autor (Wesley Miguel) é o
dono do repositório e das issues.

## 3. Escopo funcional (RF)

| ID | Requisito | Status |
| --- | --- | --- |
| RF-01 | Consumir perfil via `GET /users/{username}` | ✅ |
| RF-02 | Exibir avatar, nome, bio, @username, seguidores e link de perfil (fallback p/ nulos) | ✅ |
| RF-03 | Repositório público com ≥ 10 issues autorais em Markdown | ✅ (12 issues) |
| RF-04 | Listar issues recentes na Home quando busca vazia, ordem decrescente | ✅ |
| RF-05 | Busca textual via Search API do GitHub | ✅ |
| RF-06 | Debounce 400–600 ms; nova busca reinicia na página 1 | ✅ (500 ms) |
| RF-07 | Paginação real por `page`/`per_page` (< 10) | ✅ (6/página) |
| RF-08 | Cards com título, data relativa, resumo e nº de comentários | ✅ |
| RF-09 | Rota dinâmica `/post/:number` sem reload | ✅ |
| RF-10 | Detalhe via `GET /repos/{owner}/{repo}/issues/{number}`, inclusive acesso direto | ✅ |
| RF-11 | Corpo renderizado em Markdown | ✅ |
| RF-12 | Cabeçalho detalhado + "Ver no GitHub" + "Voltar" | ✅ |
| RF-13 | Estados loading/erro/vazio + "Tentar novamente" | ✅ |
| RF-14 | Tratamento de 403/429 (rate limit) | ✅ |
| RF-15 | Interface responsiva (Tailwind) | ✅ |
| RF-16 | Acessibilidade + rota 404 tratada | ✅ |

## 4. Regras de negócio (RN)

- **RN-01** Fonte: API do GitHub (dados reais).
- **RN-02** Repositório público do aluno, ≥ 10 issues com conteúdo Markdown.
- **RN-03** Busca inclui qualificador `is:issue`.
- **RN-04** Busca vazia: `/repos/{owner}/{repo}/issues?state=all&sort=created&direction=desc`.
- **RN-05** Paginação real no servidor.
- **RN-06** Termo normalizado (`trim`) e enviado via `params` do Axios.
- **RN-07** Resumos em texto puro (Markdown removido), truncados; conteúdo ausente → mensagem; links seguros.
- **RN-08** Distinguir 404, rate limit, erro de rede e sem resultados.

## 5. Requisitos não funcionais

- SPA sem reload completo.
- Responsivo (mobile/tablet/desktop), sem scroll horizontal.
- Acessibilidade: nomes acessíveis, labels, foco visível, contraste ≥ 4.5:1, Lighthouse 1.0.
- Sem token exposto no frontend (requisições anônimas, 60 req/hora/IP).
- Tratamento de erro sem loading eterno.

## 6. Métricas de sucesso

- Lighthouse: A11y 1.0, Best Practices 1.0, SEO 1.0.
- ≥ 10 issues publicadas e legíveis.
- Busca e paginação funcionando contra a API real.
- Deploy público (Vercel).

## 7. Fora de escopo

Backend próprio, banco de dados, autenticação, edição de posts pela aplicação.