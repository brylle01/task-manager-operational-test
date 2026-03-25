# Task Manager

A full-stack task management application built with Django REST Framework and React + TypeScript.

## Tech Stack

- **Backend:** Django 4.2, Django REST Framework, SQLite
- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4

---

## Backend Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers
```

### Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

### Run Server

```bash
python manage.py runserver
```

The backend runs at `http://127.0.0.1:8000`.

---

## Frontend Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd frontend
npm install
```

### Run Dev Server

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## API Endpoints

Base URL: `http://127.0.0.1:8000/api`

### Tasks

| Method   | Endpoint          | Description                  | Request Body                                      | Response         |
|----------|-------------------|------------------------------|---------------------------------------------------|------------------|
| `GET`    | `/tasks/`         | List all tasks               | —                                                 | `Task[]`         |
| `POST`   | `/tasks/`         | Create a new task            | `{ title, description?, completed? }`             | `Task`           |
| `GET`    | `/tasks/{id}/`    | Get a single task            | —                                                 | `Task`           |
| `PUT`    | `/tasks/{id}/`    | Update a task                | `{ title?, description?, completed? }`            | `Task`           |
| `PATCH`  | `/tasks/{id}/`    | Toggle task completion       | —                                                 | `Task`           |
| `DELETE` | `/tasks/{id}/`    | Delete a task                | —                                                 | `204 No Content` |

### Task Object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2026-03-26T10:30:00Z"
}
```

### Response Codes

| Code  | Meaning              |
|-------|----------------------|
| `200` | Success              |
| `201` | Created              |
| `204` | Deleted              |
| `400` | Validation error     |
| `404` | Task not found       |

---

## CORS Configuration

The backend allows requests from:

- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:5173`

Update `CORS_ALLOWED_ORIGINS` in `backend/backend/settings.py` to add more origins.
