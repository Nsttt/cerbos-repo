# Rspack project

This repo now includes a Cerbos embedded PDP (WASM) integration using:

- `@cerbos/embedded-client`
- `@cerbos/embedded-server`

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server, and the app will be available at <http://localhost:8080>.

```bash
pnpm run dev
```

Start with your Cerbos Hub ePDP rule ID:

```bash
CERBOS_RULE_ID=<RULE_ID> pnpm run dev
```

Without `CERBOS_RULE_ID`, the app disables checks and shows a setup warning.

Build the app for production:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

## Learn more

To learn more about Rspack, check out the following resources:

- [Rspack documentation](https://rspack.rs) - explore Rspack features and APIs.
- [Rspack GitHub repository](https://github.com/web-infra-dev/rspack) - your feedback and contributions are welcome!
