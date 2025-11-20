# Stage 1 — Builder (Debian-based for faster native builds)
FROM node:20-bullseye AS build

WORKDIR /app

# Install build dependencies required by node-gyp / native modules
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  python3 \
  python3-dev \
  python3-distutils \
  python-is-python3 \
  build-essential \
  make \
  g++ \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install node deps (dev deps required for a build)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy app source
COPY . .

# Build env / memory and disable CRA eslint as before
ENV DISABLE_ESLINT_PLUGIN=true
ENV CI=false
ENV NODE_OPTIONS=--max_old_space_size=8192

# Run the build (uses react-app-rewired as in your package.json)
RUN npm run build

# Stage 2 — Serve with nginx (small runtime)
FROM nginx:alpine AS production

# Copy built static files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Replace default nginx config with SPA fallback (ensure file nginx.conf exists)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

