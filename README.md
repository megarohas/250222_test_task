# Simple React ToDo

A small to-do list in React that loads, edits, saves and deletes tasks through
a REST API.

## What it does

- Loads the task list with `GET /tasks` and shows how many tasks there are.
- Each task card shows its ID, a text field (debounced by 500 ms) and a
  **To Do / Done** status select.
- Editing a task marks it as unsaved and shows a **Save Changes** button, which
  sends the whole task with `PUT /tasks/:id`.
- **Remove Task** sends `DELETE /tasks/:id` and drops the card.
- **Add One More Task** sends `POST /tasks` and appends an empty task with the
  next ID.
- Every action ends with a browser `alert`, both on success and on error.

The API base URL (`https://api.interview.flowmapp.com/tasks`) is hard-coded in
`src/App.js` and `src/components/`. That interview API is no longer online, so
the app now only shows the error alert. Point the URLs at your own `/tasks`
endpoint to try it.

## Stack

React 17 (function components and hooks), Create React App 5,
`react-select`, `react-debounce-input` and the Fetch API.

## Getting started

```bash
npm install
npm start       # dev server on http://localhost:3000
npm run build   # production build in build/
```

## Context

Test assignment for a frontend interview, February 2022.
