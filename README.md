# Dashboard App

A responsive product dashboard built with React, TypeScript, React Router, Tailwind CSS and the native `fetch()` API.

The project was created as a frontend coding task. It focuses on clean component structure, API integration, loading and error handling, routing, responsive UI and maintainable code. An optional FastAPI backend is included as a bonus to expose a health endpoint and project metadata.

## Features

* Dashboard page with product overview
* Dynamic product detail page using React Router
* Data fetching from DummyJSON Products API
* Native `fetch()` API, no Axios
* Search by product title, description and category
* Category filtering
* Sorting by price and rating
* Infinite scrolling with paginated product display
* Loading, error and empty states
* API status indicator
* Optional backend status indicator
* Light and dark mode with saved user preference
* Responsive layout for desktop, tablet and mobile
* Smooth UI animations and scroll-to-top interaction

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Native `fetch()`

### Backend

* Python
* FastAPI
* Uvicorn

## Project Architecture

```txt
dashboard-app/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

## Frontend Architecture

The frontend is organized around reusable components and separated responsibilities:

* `pages/` contains route-level views such as the dashboard and product detail page.
* `components/` contains reusable UI components such as product cards, loading states, error states and status badges.
* `services/` contains API access logic using the native `fetch()` API.
* `types/` contains TypeScript types for product data.
* `hooks/` contains reusable React logic such as theme handling.
* `utils/` contains small helper functions.

## Backend Architecture

The backend is optional and not required for the frontend to work. It provides:

* `GET /health` for backend availability checks
* `GET /project-info` for project metadata
* CORS configuration for local frontend development

If the backend is not running, the frontend still works and displays the backend as optional.

## API

The product data is loaded from DummyJSON:

```txt
https://dummyjson.com/products
```

The application uses only the native `fetch()` API, as requested in the task requirements.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs by default on:

```txt
http://localhost:5173
```

## Run Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The backend runs by default on:

```txt
http://localhost:8000
```

## Environment Variables

Create a `.env` file inside the `frontend` folder if you want to change the backend URL:

```env
VITE_BACKEND_BASE_URL=http://localhost:8000
```

An example file can be provided as:

```txt
frontend/.env.example
```

## Build

```bash
cd frontend
npm run build
```

## Lint

```bash
cd frontend
npm run lint
```

## Difficulties and Decisions

One important decision was to keep the frontend independent from the optional backend. The product dashboard uses a public API directly, while the FastAPI backend only provides additional status and metadata endpoints. This keeps the required frontend task simple and reliable while still showing backend knowledge.

Another challenge was balancing additional features with code simplicity. Features such as infinite scrolling, dark mode and backend status indicators were added carefully without introducing heavy libraries or unnecessary boilerplate.

The project also avoids Axios and large UI libraries to follow the task requirements and keep the implementation lightweight.

## Limitations

* The product data depends on the availability of the public DummyJSON API.
* The optional backend is used only for health and project metadata.
* Infinite scrolling is implemented on already fetched product data instead of using server-side pagination.
* Authentication and protected routes are not included because they were outside the scope of the task.

## Possible Future Improvements

* Add authentication and protected dashboard routes
* Add server-side pagination
* Add product favorites or recently viewed products
* Add stronger accessibility testing
* Add unit tests with React Testing Library
* Add SEO metadata for public pages
* Deploy the frontend and backend separately
* Add performance optimizations for very large datasets
