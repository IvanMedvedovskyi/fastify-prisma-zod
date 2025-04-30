# 🚗 Project API Documentation

Welcome to the REST API for managing engineers, projects, car prototypes, and test results.

---

## 📌 Base URL
http://localhost:3000


---

## 📖 Swagger Documentation

- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- OpenAPI JSON: [http://localhost:3000/api-docs/json](http://localhost:3000/api-docs/json)

---

## 📂 Endpoints Overview

### 👷 Engineers

| Method | Endpoint                                 | Description                         |
|--------|------------------------------------------|-------------------------------------|
| GET    | `/api/engineers`                         | Get all engineers                   |
| POST   | `/api/engineers`                         | Add a new engineer                  |
| GET    | `/api/engineers/{id}`                    | Get engineer by ID                  |
| PUT    | `/api/engineers/{id}`                    | Update engineer by ID               |
| PUT    | `/api/engineers/{projectID}/assign`      | Assign an engineer to a project     |

---

### 🧱 Projects

| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| POST   | `/api/project`          | Create a new project      |
| GET    | `/api/project`          | Get all projects          |
| GET    | `/api/project/{id}`     | Get a project by ID       |
| PUT    | `/api/project/{id}`     | Update a project by ID    |
| DELETE | `/api/project/{id}`     | Delete a project by ID    |

---

### 🚘 Car Prototypes

| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/prototype`         | Create a new car prototype     |
| GET    | `/api/prototype`         | Get all car prototypes         |
| GET    | `/api/prototype/{id}`    | Get a car prototype by ID      |
| PUT    | `/api/prototype/{id}`    | Update a car prototype by ID   |
| DELETE | `/api/prototype/{id}`    | Delete a car prototype by ID   |

---

### 🧪 Test Results *(Coming Soon)*

> Endpoints for test results are under development.

---

## 🛠 Technologies Used

- **Node.js** / **Fastify**
- **Prisma ORM**
- **Swagger (OpenAPI)**
- **PostgreSQL**
- **Docker** (optional)

---

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Install dependencies
npm install

# Run Prisma migrations (optional)
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev

# Access Swagger UI
# http://localhost:3000/api-docs
