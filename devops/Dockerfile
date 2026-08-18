# Multi-stage build. Context: app/ (see docker-bake.yml / build script)
FROM public.ecr.aws/docker/library/node:26 AS builder

WORKDIR /app
RUN npm install -g yarn@1.22.22
COPY package.json yarn.lock .dsfr.yml .npmrc ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build && yarn install --production --ignore-scripts

FROM public.ecr.aws/docker/library/node:26-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 80
# node build executes build/index.js which starts the server (@sveltejs/adapter-node)
# env vars (PORT, PUBLIC_ARENA_URL, MATOMO_URL, MATOMO_ID, PUBLIC_GIT_COMMIT) are read at runtime
CMD ["node", "build"]
