# On-Point

A modern **Progressive Web App (PWA)** dart scorekeeper built with **React** and **FastAPI**.

On-Point is designed to make tracking dart matches fast, simple, and reliable. It provides a clean interface for scoring games while leveraging a Python backend for game logic and future online features.

## Features

- 🎯 Fast and intuitive dart scoring
- 📱 Progressive Web App (PWA)
- ⚛️ React frontend
- 🐍 FastAPI backend
- 📊 Match score tracking
- 💾 Persistent game data (when configured)
- 🚀 Easily deployable

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Uvicorn

---

## Project Structure

```
on-point/
├── frontend/
│   ├── src/
│   └── ...
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── venv/
│   └── ...
└── README.md
```

---

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Activate the Python virtual environment:

```bash
source venv/bin/activate
```

Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```
http://127.0.0.1:8000
```

Interactive API documentation:

```
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

From the frontend directory:

```bash
npm install
npm run dev
```

The development server will typically be available at:

```
http://localhost:5173
```

---

## Roadmap

- [ ] User authentication
- [ ] Match history
- [ ] Player statistics
- [ ] Cricket game mode
- [ ] Online multiplayer
- [ ] Cloud synchronization
- [ ] Tournament management
- [ ] Checkout suggestions
- [ ] Dark/Light themes

---

## License

This project is open source and available under the MIT License.