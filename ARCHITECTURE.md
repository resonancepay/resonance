# Resonance — Architecture & Design Decisions

This document explains the key decisions, assumptions, and patterns used across this monorepo. It is meant to serve as a reference for anyone working on this project, including future contributors and AI assistants.

---

## Table of Contents

1. [Monorepo Structure](#1-monorepo-structure)
2. [How Packages Are Shared Across Apps](#2-how-packages-are-shared-across-apps)
3. [Tailwind CSS v4 Setup](#3-tailwind-css-v4-setup)
4. [Design Token System](#4-design-token-system)
5. [Dark Mode Strategy](#5-dark-mode-strategy)
6. [Font Sharing](#6-font-sharing)
7. [Icon System](#7-icon-system)
8. [Shared UI Components](#8-shared-ui-components)
9. [TypeScript Configuration](#9-typescript-configuration)
10. [Editor Autocomplete (Tailwind IntelliSense)](#10-editor-autocomplete-tailwind-intellisense)

---

## 1. Monorepo Structure

```
resonance/
├── apps/
│   ├── admin-portal/     # Next.js app for admins
│   └── staff-portal/     # Next.js app for staff
├── packages/
│   └── ui/               # Shared design system (components, tokens, icons, fonts)
├── .vscode/
│   └── settings.json     # Workspace-wide editor settings
├── pnpm-workspace.yaml   # Declares workspace packages
├── turbo.json            # Turborepo task pipeline
└── package.json          # Root package (scripts, devDependencies)
```

**Tools involved:**

| Tool | Role |
|------|------|
| pnpm workspaces | Makes local packages importable across apps via symlinks |
| Turborepo | Orchestrates tasks (build, dev, lint) in the right order with caching |
| Next.js | Framework for each app |
| Tailwind CSS v4 | Utility-first CSS, configured via CSS files (not JS) |
| TypeScript | Type safety across all packages and apps |

---

## 2. How Packages Are Shared Across Apps

### The actual mechanism: pnpm workspaces

Turborepo does **not** make packages importable. That is handled entirely by **pnpm workspaces**.

In `pnpm-workspace.yaml`, all folders under `apps/*` and `packages/*` are declared as workspace members. When an app lists `@resonance/ui: workspace:*` as a dependency, pnpm creates a symlink:

```
apps/admin-portal/node_modules/@resonance/ui  →  packages/ui
```

This means when the app imports from `@resonance/ui`, Node resolves it directly to the live source files in `packages/ui/src`. No build step, no publishing — changes in the package are immediately reflected in all apps.

### What Turborepo actually does

Turborepo only manages **task orchestration**:
- Runs tasks in dependency order (builds `@resonance/ui` before the apps that depend on it)
- Caches task outputs so unchanged packages are not rebuilt
- Runs independent tasks in parallel (e.g., both apps build at the same time)

Removing Turborepo would not break imports — it would only make running tasks slower and manual.

### Package exports

`packages/ui/package.json` defines explicit export paths so apps can import specific things:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./fonts": "./src/fonts.ts",
    "./styles/tokens.css": "./src/styles/tokens.css",
    "./styles/theme.css": "./src/styles/theme.css",
    "./icons": "./src/icons/index.tsx"
  }
}
```

This means:
- `import { Button } from "@resonance/ui"` → resolves to `src/index.ts`
- `import { googleSansFlex } from "@resonance/ui/fonts"` → resolves to `src/fonts.ts`
- `import { UserIcon } from "@resonance/ui/icons"` → resolves to `src/icons/index.tsx`
- `@import "@resonance/ui/styles/tokens.css"` → resolves to the CSS file directly

---

## 3. Tailwind CSS v4 Setup

### CSS-first configuration

Tailwind v4 removed the `tailwind.config.js` file. Everything is now configured through CSS using the `@theme` directive. There is no JavaScript config in this project.

Each app's entry CSS file (`src/app/globals.css`) bootstraps Tailwind and imports the shared tokens:

```css
@import "tailwindcss";
@import "@resonance/ui/styles/tokens.css";
@import "@resonance/ui/styles/theme.css";

@theme inline {
  --font-sans: var(--font-google-sans-flex);
}
```

### Why `@theme` is processed per app, not in the package

`@theme` is **not native CSS** — it is a Tailwind-specific directive processed by the PostCSS plugin. Since `packages/ui` does not have Tailwind installed (it has no PostCSS pipeline of its own), the `@theme` blocks in `theme.css` are not processed there.

When an app imports `theme.css`, it is the **app's own Tailwind pipeline** that processes the `@theme` block and generates the utility classes. This is why there is no Tailwind dependency in `packages/ui` — it intentionally relies on the consuming app's pipeline.

### What `@theme inline` does

`@theme inline` tells Tailwind to generate utility classes from the listed CSS variables **without duplicating the values** into a separate Tailwind-managed variable. The `inline` keyword means: "read the value directly from the CSS variable at runtime rather than copying it."

This is important for dark mode — since the underlying CSS variables change between light and dark, Tailwind's generated utilities automatically reflect the correct value without any extra configuration.

---

## 4. Design Token System

### Two-file pattern

Tokens are split into two files with distinct responsibilities:

**`packages/ui/src/styles/tokens.css`** — the single source of truth for all raw values

This file defines CSS custom properties (variables) for every design token. It has three blocks:
- `:root` — light mode values (always applied)
- `.dark` — dark mode values applied when the `.dark` class is on the `<html>` element
- `@media (prefers-color-scheme: dark) { :root:not(.light) }` — OS-level dark mode (overridden by the `.light` class)

**`packages/ui/src/styles/theme.css`** — maps tokens to Tailwind utility classes

This file uses `@theme inline` to expose every token as a Tailwind utility. The naming convention determines which Tailwind utilities are generated:

| CSS variable prefix | Generated utilities |
|---------------------|---------------------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `fill-*`, etc. |
| `--radius-*` | `rounded-*` |
| `--spacing-pm-*` | `p-pm-*`, `m-pm-*`, `gap-pm-*`, etc. |
| `--shadow-*` | `shadow-*` |
| `--font-*` | `font-*` |

### Token naming conventions

- **Area colors:** `--background`, `--surface`, `--muted`, `--border` (and `*-2` variants)
- **Text & Icons:** `--primary`, `--secondary`, `--tertiary`, `--inverted`
- **Brand:** `--brand-bg-light`, `--brand-border`, `--brand-hover`, `--brand-text-icons`, `--brand-bg-bold`, `--brand-pressed`
- **Feedback:** `--success-*`, `--danger-*`, `--warning-*`, `--info-*` (same 6-token pattern as brand)
- **Page margin spacing:** `--spacing-pm-*` (additive — does not override Tailwind's default spacing scale)
- **Shadows:** `--shadow-100` through `--shadow-400`
- **Elevations:** `--shadow-500` through `--shadow-800`

The `--spacing-pm-*` prefix was deliberately chosen so page margin utilities (`p-pm-4`, `mx-pm-8`, etc.) coexist with Tailwind's built-in spacing utilities (`p-4`, `mx-8`) without conflict.

---

## 5. Dark Mode Strategy

Three CSS blocks handle all dark mode cases:

```css
/* 1. Light mode — always the default */
:root { ... }

/* 2. Manual dark mode — user toggled dark via JS (adds .dark to <html>) */
.dark { ... }

/* 3. OS dark mode — respects system preference, unless .light class is present */
@media (prefers-color-scheme: dark) {
  :root:not(.light) { ... }
}
```

**Why the duplication between blocks 2 and 3?**

CSS has no native mechanism to share values between a class selector and a media query. The same token values must be written in both the `.dark` block and the `@media` block. This is an accepted tradeoff for supporting both manual and OS-based dark mode simultaneously.

**How to toggle dark mode in an app:**
- Add `.dark` to `<html>` for manual dark mode
- Add `.light` to `<html>` to force light mode even when the OS is in dark mode
- Add neither to let the OS preference decide

---

## 6. Font Sharing

### Why `next/font` lives in `packages/ui`

Google Sans Flex is the only font used across the entire project. Rather than configuring it separately in each app, it is defined once in `packages/ui/src/fonts.ts` and imported by each app's layout.

```ts
// packages/ui/src/fonts.ts
import { Google_Sans_Flex } from "next/font/google";

export const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
  adjustFontFallback: false,
});
```

`adjustFontFallback: false` suppresses a harmless warning caused by Next.js not having size metrics for Google Sans Flex in its internal database. The font still loads and renders correctly.

### Why `next` is a peer dependency of `packages/ui`

`packages/ui` imports from `next/font/google`. Since it doesn't bundle Next.js itself, it declares `next` as a peer dependency — meaning "whoever uses this package must provide Next.js." Each app already has Next.js installed, so no duplication occurs.

### How the font is activated in an app

```tsx
// apps/staff-portal/src/app/layout.tsx
import { googleSansFlex } from "@resonance/ui/fonts";

export default function RootLayout({ children }) {
  return (
    <html className={`${googleSansFlex.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
```

`googleSansFlex.variable` injects a CSS variable (`--font-google-sans-flex`) into the `<html>` element. The app's `globals.css` then maps this to Tailwind's `font-sans`:

```css
@theme inline {
  --font-sans: var(--font-google-sans-flex);
}
```

This means every element using `font-sans` (Tailwind's default) automatically uses Google Sans Flex.

---

## 7. Icon System

### Approach: SVG as React components

Icons live in `packages/ui/src/icons/index.tsx` as plain React components. No bundler plugin (like SVGR) is needed — Next.js (via the underlying webpack/turbopack config) handles `.tsx` files natively.

### How icons use color

All icon paths use `fill="currentColor"` instead of hardcoded hex values. `currentColor` is a CSS keyword that inherits the text color of the element's parent. This means icons are fully controlled by Tailwind text color utilities:

```tsx
<UserIcon className="text-primary" />         // uses --primary token
<WalletIcon className="text-brand-text-icons" /> // uses brand color token
```

### Icon component interface

```ts
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}
```

Every icon extends `SVGProps<SVGSVGElement>`, which means all native SVG attributes (`aria-label`, `role`, `style`, etc.) are supported out of the box. The `size` prop controls both `width` and `height`.

### Importing icons

```tsx
import { UserIcon, WalletIcon } from "@resonance/ui/icons";
```

---

## 8. Shared UI Components

### Component structure

Each component lives in its own folder under `packages/ui/src/components/`:

```
components/
└── button/
    ├── button.tsx        # Component implementation
    ├── button.types.ts   # Props interface
    └── index.ts          # Re-exports
```

### `"use client"` directive

Any component that uses React hooks (`useState`, `useEffect`, etc.) must have `"use client"` at the top of the file. This is a Next.js App Router requirement — it marks the component as a Client Component, opting it out of server-side rendering for that file.

Components without hooks (pure rendering) do not need this directive and can be used as Server Components.

### Why `ButtonHTMLAttributes` is extended

```ts
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { ... }
```

Extending `ButtonHTMLAttributes` means every native button attribute (`onClick`, `type`, `aria-label`, `form`, `disabled`, etc.) is automatically supported without being explicitly listed in the interface. The component spreads `...props` onto the underlying `<button>` element, passing everything through.

---

## 9. TypeScript Configuration

### Why `packages/ui` has its own `tsconfig.json`

TypeScript resolves configuration relative to the file being checked. When the type checker processes files inside `packages/ui`, it needs a local `tsconfig.json` to know:
- How to handle `.tsx` files (`"jsx": "react-jsx"`)
- Which files to include
- Module resolution strategy

The apps' `tsconfig.json` files only cover their own directories. Without a `tsconfig.json` in `packages/ui`, TypeScript falls back to defaults which do not include JSX support.

### Why `@types/react` is a devDependency of `packages/ui`

`packages/ui` uses React types (`ReactNode`, `SVGProps`, `ButtonHTMLAttributes`, etc.) when writing components. Without `@types/react` as a dev dependency, the TypeScript compiler cannot resolve these types.

However, React itself remains a **peer dependency** — the actual React runtime is provided by the consuming app at runtime, not by the package.

| Dependency type | Purpose |
|-----------------|---------|
| `peerDependencies: react` | App provides React at runtime |
| `devDependencies: @types/react` | Package uses React types during development |

---

## 10. Editor Autocomplete (Tailwind IntelliSense)

### Why autocomplete requires configuration

The Tailwind CSS IntelliSense VS Code extension generates autocomplete suggestions by reading a Tailwind entry point CSS file (one that contains `@import "tailwindcss"`). In v4, there is no `tailwind.config.js` to read, so the extension must be told explicitly where the CSS entry point is.

### Why we reference `staff-portal/globals.css`

`globals.css` in any app is the correct entry point because it is the file that:
1. Imports Tailwind itself (`@import "tailwindcss"`)
2. Imports the shared tokens (`@import "@resonance/ui/styles/tokens.css"`)
3. Imports the theme mappings (`@import "@resonance/ui/styles/theme.css"`)

By the time IntelliSense processes this one file, it has seen all custom tokens and can suggest them everywhere.

Either app's `globals.css` works — both files are structurally identical. The staff-portal is referenced because it reflects the most recent development activity. If a token is added to `tokens.css` and `theme.css` but not yet reflected in autocomplete, reloading the VS Code window is usually enough to refresh the extension.

### Configuration location

The setting lives at the **monorepo root** in `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.configFile": {
    "apps/staff-portal/src/app/globals.css": [
      "apps/staff-portal/src/**",
      "packages/ui/src/**"
    ]
  }
}
```

This file is automatically picked up by VS Code when the monorepo root is the opened workspace. Settings in `.vscode/settings.json` inside a subfolder are only applied when that specific subfolder is the workspace root — which is why the setting must live at the root level.
