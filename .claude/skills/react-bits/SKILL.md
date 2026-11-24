---
name: react-bits
description: Add animated React components from React Bits (reactbits.dev, DavidHDev/react-bits). Use when the user wants animated text, backgrounds, cursors, or interactive UI components in React.
license: MIT
---

# React Bits

Components are copied into the project, not installed as one package. Suffix picks flavor: `JS` or `TS`, then `CSS` or `TW` (Tailwind).

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
# or
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
```

Registry for `components.json` and MCP: see https://reactbits.dev/get-started/installation and https://reactbits.dev/get-started/mcp (`npx shadcn@latest mcp init --client claude`).

Component source for browsing: `references/react-bits/src` if cloned. Many components need `gsap`, `motion`, `three` or `ogl`; install what the component imports.
