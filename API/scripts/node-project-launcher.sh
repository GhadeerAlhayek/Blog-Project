#!/usr/bin/env bash

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │  UNIX / macOS:                                                             │
# │    1. chmod +x node-project-launcher.sh   # (only once)                   │
# │    2. ./node-project-launcher.sh                                           │
# │                                                                             │
# │  Windows (Git Bash, WSL, Cygwin, etc.):                                    │
# │    bash node-project-launcher.sh      # no chmod step; runs under bash     │
# └─────────────────────────────────────────────────────────────────────────────┘

mkdir -p src/router src/config src/controller src/middlewares src/model && \

touch src/config/db.js src/controller/auth.js src/middlewares/admin.js src/model/Auth.js src/router/auth.routes.js src/server.js && \

npm init -y && \
npm install dotenv express express-session express-validator jsonwebtoken mysql2 && \
npm install --save-dev nodemon && \

npm pkg set name=new type=module \
  "scripts.dev=nodemon src/server.js" && \

echo "Project scaffold complete! You can now run 'npm run dev' to start the server."
