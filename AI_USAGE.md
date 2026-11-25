# Evidências de utilização de IA

## Ferramenta utilizada

- **OpenCode** (agente de código) — geração, refatoração e revisão do código,
  execução de comandos, criação do repositório/issues via API.
- **Context7 MCP** — consulta de documentação atualizada de bibliotecas
  (Tailwind v4, React Router, Axios) quando necessário.
- **Browser (Chromium integrado)** — inspeção do protótipo do Figma, testes
  manuais da aplicação, Lighthouse.
- **Web search / GitHub API** — pesquisa de usuário e criação do repositório.

## Fluxo de trabalho com IA

1. **Leitura do SPEC** (seção 3 e 4 do desafio) para extrair RF/RN.
2. **Inspeção do Figma** (link fornecido) via browser: screenshots, amostragem
   de cores (Pillow), análise de layout/espaçamentos.
3. **Scaffolding** da aplicação em lotes (config, tipos, serviço, hooks,
   componentes, páginas), com build incremental.
4. **Validação crítica** do código gerado:
   - Correção de erros de TypeScript (imports não usados, módulos inexistentes).
   - Ajuste de `loading` state inconsistente.
   - Remoção de `aria-label` que conflitava com texto visível (Lighthouse).
   - Correção de contraste (text-dim) após auditoria.
5. **Criação de dados reais** no GitHub via API (12 issues em Markdown).
6. **Testes manuais** no navegador (busca, paginação, detalhe, 404, acesso direto).
7. **Auditoria Lighthouse** e correções até 1.0 em A11y/Best Practices/SEO.
8. **Documentação** (README, PRD, TECH, TASKS, AI_USAGE).

## Uso crítico da IA (decisões humanas)

- A IA sugeriu padrões; a **validação de cores/layout** foi feita por
  amostragem de pixels do próprio Figma, não por suposição.
- A IA gerou os textos das issues; o autor revisou títulos/temas.
- O token do GitHub foi usado **apenas na sessão** para criar repo/issues;
  não está no código-fonte.
- Erros do agente (ex.: `useEffect` não definido após remoção de import) foram
  detectados via build/HMR e corrigidos.
- A IA não substituiu a verificação de requisitos: cada RF foi checado
  manualmente contra o SPEC.

## Evidências

- Commits no repositório: `feat: GitHub Blog SPA`, `merge: integrate remote README`,
  `feat: polish - error boundary, skip link, a11y, SEO, robots.txt, contrast`.
- Issues criadas: #1..#12 em `wesleymiguelweb/blog_personal`.
- Lighthouse: `lighthouse.json`/`lighthouse.html` (scores 1.0/1.0/1.0).
- Screenshots do Figma e da aplicação durante o desenvolvimento.

## Documentação técnica

Ver `README.md`, `PRD_SPEC.md`, `TECH_SPEC.md` e `TASKS_SPEC.md`.