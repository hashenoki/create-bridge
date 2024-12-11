# Create "Bridge"

Easiest way to spin up a new express app with typescript and eslint using `create-bridge` CLI.

- node v22
- express v5
- typescript
- drizzle-orm
- eslint (flat config) + prettier

## Getting Started

Simply run the following command:

**Interactive**

```bash
npx create-bridge@latest
# or
yarn create bridge
# or
pnpm create bridge
# or
bunx bridge
```

You will be prompted to enter the name of your project and given the option to choose a template.

**Non-Interactive**

You can also run the command by passing the name and other option as arguments:

```bash
npx create-bridge@latest my-app --use-pnpm --drizzle --eslint
```

Run `create-bridge --help` for more information.


## Why use Create Bridge?

create-bridge allows you to create a new node.js app within seconds and includes a number of benefits:

- **Interactive Experience**: Running `npx create-bridge@latest` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Bridge has zero dependencies.
- **Offline Support**: Create Bridge will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Template Support**: Choose from a variety of templates to get started with.

