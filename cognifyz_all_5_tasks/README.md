# Cognifyz Full Stack Development Tasks 1–5

## Requirements
- Node.js LTS installed
- Visual Studio Code (recommended)

## Run on Windows
1. Extract this ZIP file.
2. Open the `cognifyz_all_5_tasks` folder in VS Code.
3. In VS Code choose Terminal > New Terminal.
4. Confirm the terminal path is the project root (the folder containing `server.js`).
5. Run:
   ```bash
   npm install
   npm start
   ```
6. Keep the terminal open. Visit `http://localhost:3000`.

## Routes
- `/` Home page
- `/task1` HTML form + Express POST + EJS server-rendered response
- `/task2` client and server validation + temporary in-memory storage
- `/task3` Bootstrap responsive design + CSS transitions
- `/task4` password strength checker + DOM updates + dynamic greeting
- `/task5` frontend using fetch() with REST CRUD API
- `/api/students` GET all / POST create
- `/api/students/:id` GET one / PUT update / DELETE remove

## Important
- This demo stores registrations and students in memory. They are cleared when the server stops/restarts.
- Bootstrap is loaded from a CDN, so an internet connection is needed for Bootstrap styling.
- Task 1 uses EJS as required. Do not replace `res.render()` with `sendFile()` unless you intentionally change the project to a non-EJS version.
