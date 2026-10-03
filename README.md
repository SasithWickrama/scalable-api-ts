🚀 Scalable REST API with Node.js, TypeScript, Prisma, JWT & Docker
A production-style REST API built with Node.js, TypeScript, Express, Prisma ORM, PostgreSQL, JWT Authentication, and Docker.

This project demonstrates modern backend development practices, including:

Layered architecture
RESTful API design
PostgreSQL integration
Prisma ORM
JWT authentication
Password hashing with bcrypt
Request logging middleware
Database migrations
Docker containerization
Docker Compose deployment
📚 Table of Contents
Overview
Tech Stack
Architecture
Project Structure
Features
Getting Started
Environment Variables
Database Setup
Prisma Setup
Running Locally
API Endpoints
Authentication Flow
Docker Deployment
Useful Docker Commands
Development Workflow
Troubleshooting
Security Considerations
Future Improvements
🎯 Overview
This application provides a user management API with:

User registration
User login
JWT-based authentication
Protected API endpoints
Update profile functionality
Delete account functionality
Authentication is implemented using JWT tokens and passwords are securely stored using bcrypt hashes.

⚙️ Tech Stack
Backend
Node.js
TypeScript
Express.js
Database
PostgreSQL 18
ORM
Prisma 7
Authentication
JSON Web Token (JWT)
bcryptjs
Containerization
Docker
Docker Compose
Development Tools
Prisma Migrations
TSX
Nodemon
Git
🏗️ Architecture
Client (Postman / Browser)
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
 PostgreSQL Database
📁 Project Structure
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
│
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
✨ Features
User Management
Create users
Fetch users
Update users
Delete users
Authentication
Register accounts
Login with email and password
JWT token generation
Protected routes
Security
Password hashing using bcrypt
JWT authentication
Protected resources
Password never returned in API responses
Database
PostgreSQL database
Prisma ORM
Database migrations
Deployment
Dockerized API
Dockerized PostgreSQL
Docker Compose orchestration
🚀 Getting Started
1. Clone Repository
git clone https://github.com/<your-username>/scalable-api-ts.git

cd scalable-api-ts
2. Install Dependencies
npm install
🔐 Environment Variables
Create a .env file in the project root.

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydatabase"

PORT=3000

JWT_SECRET="your-super-secret-key"

JWT_EXPIRES_IN="1h"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=mydatabase
🐘 Database Setup
Start PostgreSQL Container
docker run -d \
  --name postgres-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres:18
Verify container:

docker ps
🧩 Prisma Setup
Generate Prisma Client
npx prisma generate
Create Migration
npx prisma migrate dev --name init
Open Prisma Studio
npx prisma studio
🏃 Running Locally
Development Mode
npm run dev
Server starts at:

http://localhost:3000
Production Build
Build:

npm run build
Run:

npm start
📖 API Endpoints
Public Endpoints
Register User
POST /api/users
Request:

{
  "name": "Sasith",
  "email": "sasith@example.com",
  "password": "Password123!"
}
Response:

{
  "id": 1,
  "name": "Sasith",
  "email": "sasith@example.com"
}
Login
POST /api/login
Request:

{
  "email": "sasith@example.com",
  "password": "Password123!"
}
Response:

{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
Protected Endpoints
Require:

Authorization: Bearer YOUR_JWT_TOKEN
Get Users
GET /api/users
Update User
PUT /api/users/:id
Request:

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
Delete User
DELETE /api/users/:id
🔑 Authentication Flow
Register
User
 ↓
Password
 ↓
bcrypt Hash
 ↓
Database
Login
Email + Password
         ↓
Validate Credentials
         ↓
Generate JWT
         ↓
Return Token
Protected Request
Client Request
       │
       ▼

Authorization Header
       │
       ▼

JWT Middleware
       │
 ┌─────┴─────┐
 │           │
 ▼           ▼

Valid      Invalid
 │           │
 ▼           ▼

Next      401 Error
🐳 Docker Deployment
Dockerfile
The project uses a multi-stage Docker build:

Stage 1
Install dependencies
Generate Prisma Client
Build TypeScript
Stage 2
Production runtime
Install production dependencies
Run migrations
Start application
Docker Compose
The application consists of:

API Container
Node.js
Express
JWT
Prisma
Database Container
PostgreSQL
Start Everything
Build images:

docker compose build
Run containers:

docker compose up
Background mode:

docker compose up -d
Stop Containers
docker compose down
Rebuild Everything
docker compose up --build
🌐 Docker Networking
Local Development
localhost:5432
Used by:

Node.js running on host machine
Docker Environment
db:5432
Used by:

API container
The service name db acts as the database hostname inside Docker Compose.

🧪 Testing the API
Register
POST /api/users
Create a user account.

Login
POST /api/login
Retrieve JWT token.

Add JWT Token
Authorization: Bearer JWT_TOKEN
Test Protected Routes
GET /api/users
PUT /api/users/:id
DELETE /api/users/:id
🔄 Development Workflow
Start Database
docker compose up -d db
Run API
npm run dev
Create Migration
npx prisma migrate dev --name migration_name
Regenerate Prisma Client
npx prisma generate
Build TypeScript
npm run build
Run Production Build
npm start
Run Full Stack
docker compose up --build
🛠 Useful Docker Commands
Running Containers
docker compose ps
API Logs
docker compose logs api
Follow Logs
docker compose logs -f api
Database Logs
docker compose logs db
Enter API Container
docker compose exec api sh
Enter Database Container
docker compose exec db bash
🚨 Troubleshooting
Docker Cannot Download Images
Error example:

failed to resolve source metadata
lookup registry-1.docker.io
Check Docker connectivity:

docker pull hello-world
Restart Docker Desktop if needed.

Database Connection Errors
Verify:

docker compose ps
Check database logs:

docker compose logs db
Prisma Migration Issues
Run:

npx prisma migrate deploy
Verify:

npx prisma generate
🔒 Security Considerations
This project is intended for learning purposes.

For production environments:

Store secrets in a secure secrets manager
Rotate JWT secrets regularly
Enable HTTPS
Add rate limiting
Validate request payloads
Implement refresh tokens
Use RBAC (Role-Based Access Control)
Add audit logging
🚀 Future Improvements
Validation
Zod
Joi
Testing
Jest
Supertest
Authentication
Refresh Tokens
Password Reset
Authorization
Roles
Permissions
CI/CD
GitHub Actions
Azure DevOps
Cloud Deployment
Azure App Service
AWS ECS
AWS EC2
DigitalOcean
Monitoring
Prometheus
Grafana
OpenTelemetry
🎓 What This Project Demonstrates
✅ TypeScript

✅ Express.js

✅ REST API Development

✅ PostgreSQL

✅ Prisma ORM

✅ Database Migrations

✅ Layered Architecture

✅ JWT Authentication

✅ Password Hashing

✅ Middleware

✅ Error Handling

✅ Docker

✅ Docker Compose

✅ Multi-Stage Docker Builds

✅ Environment Variables

✅ API Deployment

👨‍💻 Author
Sasith Wickramasinghe

Built as a learning project to explore modern backend development using Node.js, TypeScript, Prisma, PostgreSQL, JWT authentication, and Docker.
