# Install dependencies only when needed
FROM mhart/alpine-node AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM mhart/alpine-node AS builder

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=https://api.htstyle.ml/api/v1/

WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM mhart/alpine-node AS runner

ARG X_TAG
WORKDIR /opt/app
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=https://api.htstyle.ml/api/v1/
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
