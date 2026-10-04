<h1 align="center">Hi 👋, I'm Sasith Wickramasinghe</h1>

<h3 align="center">Backend Developer | DevOps Engineer | Software Engineer from Finland 🇫🇮</h3>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=sasithwickrama&label=Profile%20views&color=0e75b6&style=flat" alt="sasithwickrama" />
</p>

<p align="center">
  <a href="https://github.com/SasithWickrama">
    <img src="https://img.shields.io/github/followers/SasithWickrama?label=Followers&style=for-the-badge" alt="GitHub Followers">
  </a>
  <a href="https://github.com/SasithWickrama?tab=repositories">
    <img src="https://img.shields.io/badge/GitHub-Projects-black?style=for-the-badge&logo=github" alt="GitHub Projects">
  </a>
</p>

---

## 👨‍💻 About Me

- 🔭 Currently working on a **Scalable REST API / DevOps Project**
- 🌱 Currently learning **TypeScript, Rust, Cloud & DevOps**
- 💻 Experienced in **Backend Development, API Integration, OSS/BSS, DevOps and Distributed Systems**
- 🐳 Interested in **Docker, Kubernetes, CI/CD and Cloud Technologies**
- ☁️ Working with **AWS, Azure and Linux**
- 📍 Based in **Finland 🇫🇮**
- 📫 Email: **sasith.wickrama@gmail.com**

---

## 🔗 Connect With Me

<p align="left">
  <a href="https://www.linkedin.com/in/sasith-wickramasinghe/" target="_blank">
    <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
         alt="LinkedIn"
         height="30"
         width="40" />
  </a>
</p>

---

# 🚀 Scalable REST API with Node.js, TypeScript, Prisma, JWT & Docker

A production-style REST API built with:

**Node.js + TypeScript + Express + Prisma ORM + PostgreSQL + JWT Authentication + Docker**

This project demonstrates modern backend development and DevOps practices including:

- 🏗️ Layered Architecture
- 🌐 RESTful API Design
- 🐘 PostgreSQL Integration
- 🧩 Prisma ORM
- 🔐 JWT Authentication
- 🔑 Password Hashing with bcrypt
- 📝 Request Logging Middleware
- 🗄️ Database Migrations
- 🐳 Docker Containerization
- 🐙 Docker Compose
- ⚙️ TypeScript Development
- 🚀 Production Build
- 🔒 Protected API Endpoints

---

# 📚 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Prisma Setup](#-prisma-setup)
- [Running Locally](#️-running-locally)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Docker Deployment](#-docker-deployment)
- [Docker Networking](#-docker-networking)
- [Testing the API](#-testing-the-api)
- [Development Workflow](#-development-workflow)
- [Useful Docker Commands](#-useful-docker-commands)
- [Troubleshooting](#-troubleshooting)
- [Security Considerations](#-security-considerations)
- [Future Improvements](#-future-improvements)
- [What This Project Demonstrates](#-what-this-project-demonstrates)
- [Languages & Tools](#-languages--tools)
- [Author](#-author)

---

# 🎯 Overview

This application provides a complete user management REST API.

### Core functionality

| Feature | Description |
|---|---|
| 👤 User Registration | Create a new user account |
| 🔐 Authentication | Login using email and password |
| 🎟️ JWT | Generate authentication tokens |
| 🛡️ Protected APIs | Secure endpoints using JWT |
| ✏️ Update Profile | Update user information |
| 🗑️ Delete Account | Remove a user |
| 🗄️ Database | PostgreSQL |
| 🧩 ORM | Prisma |
| 🐳 Deployment | Docker + Docker Compose |

Passwords are never stored as plain text.

They are securely hashed using **bcrypt** before being stored in PostgreSQL.

---

# ⚙️ Tech Stack

## Backend

- Node.js
- TypeScript
- Express.js

## Database

- PostgreSQL 18

## ORM

- Prisma 7

## Authentication

- JSON Web Token (JWT)
- bcryptjs

## Containerization

- Docker
- Docker Compose

## Development Tools

- Prisma Migrations
- TSX
- Nodemon
- Git
- Postman

---

# 🏗️ Architecture

```mermaid
flowchart TD
    A[Client<br/>Postman / Browser] --> B[Express Server]

    B --> C[Routes]

    C --> D{JWT Middleware}

    D -->|Authenticated| E[Controllers]
    D -->|Unauthorized| X[401 Unauthorized]

    E --> F[Services]

    F --> G[Prisma Client]

    G --> H[(PostgreSQL Database)]
```

### Request Flow

```text
Client
  │
  ▼
Express Server
  │
  ▼
Routes
  │
  ▼
JWT Middleware
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Prisma Client
  │
  ▼
PostgreSQL
```

The application follows a layered architecture:

```text
┌──────────────────────────────┐
│            Client            │
│       Postman / Browser      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Express Routes        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       JWT Middleware         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Controllers          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           Services           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Prisma Client         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      PostgreSQL Database     │
└──────────────────────────────┘
```

---

# 📁 Project Structure

```text
scalable-api-ts/
│
├── generated/
│   └── prisma/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   │
│   ├── controllers/
│   │   └── userController.ts
│   │
│   ├── middlewares/
│   │   ├── auth.ts
│   │   └── logger.ts
│   │
│   ├── routes/
│   │   └── userRoutes.ts
│   │
│   ├── services/
│   │   └── userService.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── prisma.ts
│   │
│   └── index.ts
│
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

# ✨ Features

## 👤 User Management

- Create users
- Fetch users
- Update users
- Delete users

## 🔐 Authentication

- Register accounts
- Login with email and password
- JWT token generation
- Protected routes

## 🛡️ Security

- Password hashing using bcrypt
- JWT authentication
- Protected resources
- Password never returned in API responses

## 🗄️ Database

- PostgreSQL database
- Prisma ORM
- Database migrations

## 🐳 Deployment

- Dockerized API
- Dockerized PostgreSQL
- Docker Compose orchestration
- Multi-stage Docker build

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/scalable-api-ts.git

cd scalable-api-ts
```

## 2. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydatabase"

PORT=3000

JWT_SECRET="your-super-secret-key"

JWT_EXPIRES_IN="1h"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=mydatabase
```

> ⚠️ Never commit `.env` files containing real secrets to GitHub.

---

# 🐘 Database Setup

## Start PostgreSQL Container

```bash
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres:18
```

## Verify Container

```bash
docker ps
```

Expected result:

```text
CONTAINER ID   IMAGE          STATUS
xxxxxxxx       postgres:18    Up
```

---

# 🧩 Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

##
