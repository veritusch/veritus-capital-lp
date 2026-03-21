# Claude.Config

# Cheatsheet de Workflow do Claude Code

**Primeiros Passos • Configuração do Projeto • Estrutura de Arquivos • Skills • Hooks • Memória • Workflows • Edição 2026**

---

## 1. Primeiros passos

### Instalação

Requer Node.js 18+.

```
curl -fsSL https://claude.ai/install.sh | bash
```

### Iniciar no projeto

```
cd seu-projeto
claude
/init
```

<aside>
🧠

**O que o `/init` faz**

- Escaneia o código.
- Cria um arquivo inicial de memória.
</aside>

---

## 2. Entendendo o `CLAUDE.md`

**`CLAUDE.md` = memória persistente do Claude sobre o seu projeto.**

Carregada automaticamente no início de cada sessão.

### O que colocar

- Stack tecnológica
- Mapa de diretórios
- Arquitetura

### Por que isso ajuda

- Propósito de cada módulo
- Decisões de design

### Como estruturar

- Comandos de build, test e lint
- Workflows
- Observações importantes e *gotchas*

### Exemplo (projeto)

- FastAPI REST API + React SPA + Postgres

**Comandos**

```
npm run dev
npm run test
npm run lint
```

**Arquitetura (exemplo)**

```
/app → páginas Next.js (App Router)
/lib → utilitários compartilhados
/prisma → schema do banco e migrations
```

---

## 3. Hierarquia de arquivos de memória

```
~/.claude/CLAUDE.md        → Global (todos os projetos)
/CLAUDE.md                 → Raiz (monorepo)
/.claude/CLAUDE.md         → Projeto (versionado)
/frontend/CLAUDE.md        → Subpasta (contexto específico)
```

**Regras rápidas**

- Mantenha cada arquivo com menos de 200 linhas.
- Subpastas expandem o contexto.
- Nunca sobrescreva o contexto do arquivo pai.

---

## 4. CLAUDE e boas práticas

- Execute `/init` primeiro, depois refine.
- Seja específico nas instruções.
- Adicione observações que o Claude não consegue inferir.
- Referencie docs com `@arquivo`.
- Adicione regras de workflow.
- Mantenha a memória concisa.
- Versione no Git para compartilhamento.

---

## 5. Estrutura de arquivos do projeto (exemplo)

```
seu-projeto/
├── CLAUDE.md
├── .claude/
│   ├── settings.json
│   ├── settings.local.json
│   ├── skills/
│   │   ├── code-review/
│   │   │   └── SKILL.md
│   │   ├── testing/
│   │   │   └── SKILL.md
│   │   └── helpers.py
│   ├── commands/
│   │   └── deploy.md
│   └── agents/
│       └── security-reviewer.md
├── src/
└── .gitignore
```

---

## 6. Adicionando Skills (o superpoder)

**Skills = guias em Markdown que o Claude pode auto-ativar via linguagem natural.**

### Onde ficam

- Skill de projeto:

```
.claude/skills/<nome>/SKILL.md
```

- Skill pessoal:

```
~/.claude/skills/<nome>/SKILL.md
```

### Exemplo de cabeçalho

```
name: padrões de teste
description: Melhores práticas de testes
allowed tools: Read, Grep, Glob
```

### Padrões de teste (exemplo)

- Use `describe` + `it` + padrão AAA.
- Use mocks com factory.

> O campo `description` é essencial para a auto-ativação.
> 

---

## 7. Ideias de Skills para engenheiros de IA

- Code review
- Padrões de teste
- Mensagens de commit
- Deploy com Docker
- Visualização de codebase
- Design de APIs

---

## 8. Configurando Hooks

Hooks = callbacks determinísticos.

```
"hooks": {
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "scripts/sec.sh",
          "timeout": 5
        }
      ]
    }
  ]
}
```

**Códigos de saída**

- `0` → permitir
- `2` → bloquear

---

## 9. Permissões e segurança

```
{
  "permissions": {
    "allow": ["Read:*", "Bash:git:*", "Write:*.md"],
    "deny": ["Read:env:*", "Bash:sudo:*"]
  }
}
```

---

## 10. Arquitetura em 4 camadas

- **L1 — `CLAUDE.md`**
    - Contexto persistente e regras
- **L2 — Skills**
    - Conhecimento auto-executável
- **L3 — Hooks**
    - Segurança e automações
- **L4 — Agents**
    - Subagentes com contexto próprio

---

## 11. Workflow diário

```
cd projeto && claude
```

**Atalhos e hábitos**

- Shift + Tab + Tab → Modo Planejamento
- Descreva a intenção da feature
- Shift + Tab → Aceitar automático
- `/compact`
- Esc Esc → voltar e reverter
- Commit frequentemente
- Inicie uma nova sessão por feature

---

## 12. Referência rápida

```
/init      → gera CLAUDE.md
/doccat    → verifica instalação
/compact   → comprime contexto
Shift+Tab  → muda modo
Tab        → ativa raciocínio estendido
Esc Esc    → menu de reversão
```