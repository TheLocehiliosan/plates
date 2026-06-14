# Plate Pursuit — local development

default:
    @just --list

# Install Node dependencies
install:
    npm install

# Dev server at http://localhost:5173 (this machine only)
dev:
    npx vite

# Dev server on LAN — for phone testing on the same network
dev-lan:
    npm run dev

# Stop the dev server if it is listening on Vite's default port
stop:
    lsof -ti:5173 | xargs kill 2>/dev/null || true
