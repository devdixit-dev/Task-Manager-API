# 🧩 Task Manager API

A robust and scalable **Task Management API** built with **Node.js**, **Express**, and **TypeScript**.  
This API allows users to **create**, **read**, **update**, and **delete (CRUD)** tasks efficiently, with clean architecture and modular structure.

---

## ⚙️ Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Fast backend web framework  
- **TypeScript** – Type-safe JavaScript  
- **MongoDB / Mongoose** – NoSQL database (if used)  
- **dotenv** – Environment configuration  
- **Nodemon / ts-node-dev** – Development auto-restart

---

## 📁 Folder Structure

```
Task-Manager-API/
├── src/
│   ├── controllers/     # Business logic for task operations
│   ├── models/          # Database models (Task schema)
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Request validation or auth logic
│   ├── utils/           # Helper utilities
│   └── server.ts        # Entry point
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md
```

---

## 🚀 Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devdixi-dev/Task-Manager-API.git
   cd Task-Manager-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**  
   Add environment variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   _(Uses Nodemon or ts-node-dev)_

---

## 🧠 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

> Use **Postman** or **Insomnia** to test the API routes.

---

## 🧰 Scripts

| Command | Description |
|----------|--------------|
| `npm run dev` | Run in development mode |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled JS in production |
| `npm test` | Run tests (if configured) |

---

## 🛠 Environment Variables

| Variable | Description |
|-----------|--------------|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `NODE_ENV` | App environment (`development` / `production`) |

---

## 🧾 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Dev Dixit**  
💼 Backend Developer | Node.js | Express | TypeScript  
📧 devdixitsocial@gmail.com 