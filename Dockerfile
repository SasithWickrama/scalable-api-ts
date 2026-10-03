# ==========================================
# Build stage
# ==========================================

FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

ENV DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# ==========================================
# Production stage
# ==========================================

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Copy generated Prisma Client
COPY --from=builder /app/generated ./generated

# Copy Prisma schema and migrations
COPY --from=builder /app/prisma ./prisma

# Copy Prisma configuration
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# API port
EXPOSE 3000

# Apply migrations and start API
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]