# Dockerfile
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

ARG PAYLOAD_SECRET=will_be_overridden
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ARG DATABASE_URI=mongodb://localhost:27017

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

### Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Use ARG values to set ENV values
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG DATABASE_URI
ARG NEXT_PUBLIC_MINIO_HOSTNAME

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV DATABASE_URI=${DATABASE_URI}
ENV NEXT_PUBLIC_MINIO_HOSTNAME=${NEXT_PUBLIC_MINIO_HOSTNAME}

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g corepack && corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

### Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG DATABASE_URI
ARG NEXT_PUBLIC_MINIO_HOSTNAME

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV DATABASE_URI=${DATABASE_URI}
ENV NEXT_PUBLIC_MINIO_HOSTNAME=${NEXT_PUBLIC_MINIO_HOSTNAME}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
