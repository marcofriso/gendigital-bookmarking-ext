# AI Agent Guidelines (agents.md)

This repository contains a project designed to be solved with **AI assistance allowed**.
AI tools (Codex, Copilot, Cursor, ChatGPT, etc.) must act as **assistants**, not autonomous solution generators.

The goal is to have functional software, that respect best practices.

---

## 🎯 Core Principles

- The human developer **drives architecture and decisions**
- AI accelerates implementation, not reasoning
- Code must remain **interview-safe**, readable, and explainable
- Fewer abstractions are better than clever ones

---

## 🚦 Global Rules for AI Agents (Strict)

### ✅ DO

- Propose **architecture and file structure first**
- Wait for confirmation before implementing code changes
- Generate **skeletons and placeholders** before full logic
- Keep code **minimal and explicit**
- Respect all constraints defined in each exercise
- Ask for clarification if requirements are ambiguous
- Suggest **small, isolated helpers** when useful
- Prefer readability over optimization

### ❌ DO NOT

- Generate full applications unless explicitly requested
- Introduce new libraries or frameworks unless asked
- Over-engineer solutions (state machines, factories, complex patterns)
- Perform large refactors without explicit permission
- Rewrite working code “for improvement”
- Assume production-hardening is required

---

## 🧠 Expected AI Assistance

### Allowed

- File / folder structure proposals
- Component skeletons that compile
- Small utility functions
- TypeScript type definitions
- Explaining errors and suggesting **minimal fixes**
- Highlighting tradeoffs when asked

### Forbidden

- Full solution dumps
- Global refactors
- Introducing state management libraries
- Adding caching layers, middleware, or infra without request

---

## 🧩 Coding Style Guidelines

- Use **functional React components**
- Prefer **local state** unless sharing is justified
- Avoid unnecessary `useMemo` / `useCallback`
- Use explicit TypeScript types (no `any`)
- Keep hooks small and focused
- Keep components readable and predictable

---

## ⚛️ Next.js–Specific Rules

- Respect **Server vs Client** boundaries
- Do not use client-only hooks in server components
- Avoid hydration mismatches
- Keep data-fetching placement intentional (SSR vs CSR)
- Prefer clarity over framework tricks

## 🏁 End Goal

AI should behave like a **developer you work with**:

- You decide the plan
- AI helps with execution
- You understand and can explain every line

This repository values **judgment, architecture, and clarity** over speed or completeness.
