## Refactor Plan: Modularize server.js

### PHASE 1: Assess Current Server File
- [ ] List all imports
- [ ] Identify key blocks: express init, db connect, middleware, routes, listen
- [ ] Mark logic to extract

### PHASE 2: Design Folder Structure
- [ ] Define: app.js, index.js, config/, middleware/, constants/
- [ ] List all new files to create

### PHASE 3: Setup Git Branch
- [ ] Checkout dev and pull latest
- [ ] Create branch: `feature/refactor-server-modules`
- [ ] Push initial commit

### PHASE 4: Refactor Steps
- [ ] Move DB logic → `config/db.js`
- [ ] Create `app.js` and migrate server setup logic
- [ ] Make `index.js` server entry
- [ ] Extract middleware → `middleware/logger.js`, `middleware/errorHandler.js`
- [ ] Clean up and remove original logic from `server.js`
- [ ] Add shared constants in `/constants/` if needed

### PHASE 5: Test and Merge
- [ ] Test all routes and DB locally
- [ ] Lint and format code
- [ ] Push to GitHub
- [ ] Open PR into `dev` branch
- [ ] Merge after code review
