# Audio Repair — Claude Code Instructions

## Project Overview
Сайт ремонта аудиотехники. Next.js 16 + TypeScript + SCSS + FSD.

## Tech Stack
- **Framework**: Next.js 16, App Router
- **Language**: TypeScript (strict mode)
- **Styles**: SCSS modules (`@/shared/styles/variables`, `@/shared/styles/mixins`)
- **Architecture**: Feature-Sliced Design (FSD)
- **State**: Zustand (`@/shared/lib/store`)
- **Forms**: React Hook Form + Zod (`@/shared/lib/form`)
- **Data fetching**: TanStack Query (`@/shared/lib/providers`)
- **Tests**: Jest + Testing Library (unit), Playwright (e2e)

## FSD Layer Rules
```
src/
  app/          ← Next.js App Router (layouts, pages, providers)
  pages/        ← page-level compositions (используется редко с App Router)
  widgets/      ← крупные блоки UI (Header, Footer, Hero, ServicesList)
  features/     ← бизнес-функции (ContactForm, RepairRequest, CallbackForm)
  entities/     ← бизнес-сущности (Service, Review, Master)
  shared/       ← переиспользуемое (ui, lib, api, config, styles, types)
```

**Правила импортов (сверху вниз, нельзя импортировать из нижних слоёв в верхние):**
- `app` → может импортировать всё
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → ничего из проекта

## Code Style
- Одинарные кавычки, без точек с запятой (конфиг Prettier)
- `type` вместо `interface` для простых типов
- Обязательно `type` перед импортами типов: `import type { Foo } from '...'`
- Компоненты — именованный экспорт, не дефолтный (кроме страниц Next.js)
- SCSS: camelCase для классов (`.buttonWrapper`, не `.button-wrapper`)

## File Naming
- Компоненты: `PascalCase.tsx`
- Хуки: `useCamelCase.ts`
- Утилиты: `camelCase.ts`
- SCSS модули: `ComponentName.module.scss`
- Тесты: `ComponentName.test.tsx` или `__tests__/ComponentName.test.tsx`

## Git Commits (Conventional Commits)
```
feat: добавить форму заявки на ремонт
fix: исправить отображение цены на мобильных
refactor: вынести логику калькулятора в хук
style: выровнять кнопки в хедере
test: добавить тест для ContactForm
docs: обновить README
chore: обновить зависимости
```

## Commands
```bash
npm run dev          # запуск разработки
npm run build        # сборка
npm run lint         # ESLint
npm run lint:css     # Stylelint
npm run format       # Prettier
npm run test         # Jest
npm run test:e2e     # Playwright
```

## Component Template
```tsx
import type { PropsWithClassName } from '@/shared/types'
import styles from './ComponentName.module.scss'

type Props = PropsWithClassName & {
  // props here
}

export function ComponentName({ className }: Props) {
  return <div className={`${styles.root} ${className ?? ''}`}></div>
}
```

## SCSS Module Template
```scss
// Переменные и миксины доступны глобально через next.config.ts sassOptions
.root {
  // styles

  @include mobile {
    // mobile overrides
  }
}
```

## What NOT to do
- Не создавай файлы вне FSD структуры без причины
- Не используй `any` — используй правильные типы или `unknown`
- Не импортируй из слоёв ниже по FSD (entities не импортирует из features)
- Не используй `default export` в компонентах (только в страницах Next.js)
- Не пиши инлайн стили (`style={{}}`) — только SCSS модули
- Не добавляй анимации без согласования (пока не определились с библиотекой)

## Design Decisions
- Шрифты: **Russo One** (display, кириллица) + **Crimson Text** (body)
- Палитра: монохром #111→#fafafa + акцент **#F0B429** (янтарный)
- Карта: Yandex Maps iframe в ContactsSection
- Форма заявки: отправка в **Telegram-бот** (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- Данные: статичные в `model/data.ts` каждой entity
- Хостинг: Vercel

## Development Plan
Полный план в `PLAN.md`. Текущий прогресс:

**Этап 0 — Фундамент** `[x]`
Next.js 16, SCSS токены, шрифты, ESLint/Prettier, Jest/Playwright

**Этап 1 — Shared UI**
- [x] 1.1 Button (`src/shared/ui/Button/`) — primary/secondary/ghost, sm/md/lg, href→Link
- [x] 1.2 SectionTitle — eyebrow + h2, align, light-вариант
- [x] 1.3 Container — max-width обёртка
- [x] 1.4 Icon — реестр inline SVG с currentColor, type IconName

**Этап 2 — Entities** `[x]`
Service, Review, Article — types + data.ts + карточка

**Этап 3 — Виджеты главной** `[ ]`
Header [x], HeroSection [x], ServicesSection [~], ProcessSection,
MasterSection, AccentCTA, TestimonialsSection, ContactsSection, Footer

**Этап 4 — Главная страница + форма** `[ ]`
`app/page.tsx` + RepairRequest feature + `/api/contact` route

**Этап 5 — Блог** `[ ]`
`app/blog/page.tsx`, BlogHero, CategoryFilter, ArticleGrid

**Этап 6 — Страница статьи** `[ ]`
`app/blog/[slug]/page.tsx`, ArticleHero, ArticleBody, RelatedArticles

**Этап 7 — Контент блога** `[ ]`
6 статей-заглушек в `entities/Article/model/data.ts`

**Этап 8 — SEO** `[ ]`
metadata, Schema.org JSON-LD, sitemap

**Этап 9 — Тесты** `[ ]`
Unit (Button, Header, форма) + E2E (Playwright)

**Этап 10 — Деплой** `[ ]`
Vercel env, Telegram-бот, домен, аналитика

## Prompts

### Создать компонент
Создай компонент `[NAME]` в слое `[widgets/features/entities/shared]`.
Тип: `[UI/форма/карточка/секция]`. Описание: `[что делает]`.
Используй SCSS модули, TypeScript, именованный экспорт.

### Создать страницу
Создай страницу `[PATH]` в `src/app`.
SEO: title=`[title]`, description=`[desc]`.
Подключи нужные виджеты из `@/widgets`.

### Написать тест
Напиши unit-тесты для `[PATH]`.
Проверь: рендер, пропсы, пользовательские взаимодействия.
Используй Testing Library, моки через `jest.mock`.

### Создать сущность
Создай сущность `[NAME]` в `src/entities/[name]/`.
Включи: модель (types), UI-компонент, API-хук через TanStack Query.
