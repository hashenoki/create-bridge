FROM node:22.12.0-slim AS base

# Set working directory
WORKDIR /app

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.10.0 --activate

FROM base AS builder

COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install

COPY . ./

# Build dist
RUN pnpm build

# Start production image build
FROM builder AS release

# Copy node modules and build directory
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node
EXPOSE $PORT

ENTRYPOINT [ "node", "dist/index.js"]
