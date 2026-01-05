# ChatWire.io - Backend Messaging System

## Project Description
ChatWire.io is a secure, real-time messaging infrastructure built with NestJS. This project demonstrates advanced backend architecture, focusing on database integrity, secure message persistence, and real-time communication protocols.

The system is designed to provide a robust foundation for private communications, ensuring that all data handling follows industry standards for security and scalability.

## Core Technical Stack
* **Framework**: NestJS (Modular Architecture)
* **Language**: TypeScript
* **ORM**: Prisma 7
* **Database**: PostgreSQL 15 (Alpine)
* **Infrastructure**: Docker & Docker Compose
* **Communication**: WebSockets (Socket.io)

## Key Architectural Features
* **Data Security**: Messages are encrypted before being persisted in the database, ensuring confidentiality at rest.
* **Containerization**: Fully orchestrated environment using Docker, providing consistent development and deployment workflows.
* **Service Decoupling**: Strict separation of concerns between authentication, cryptographic operations, and messaging logic.
* **Database Governance**: Automated schema management and versioning through Prisma migrations.

## System Architecture
The application follows a modular NestJS structure where each domain is isolated:
* **Prisma Module**: Manages the database connection lifecycle and provides a globally injectable service.
* **Security Module**: Centralizes all cryptographic logic, including AES-256 encryption for message payloads and secure password hashing.
* **Chat Module**: Handles real-time event broadcasting and message persistence logic.

## Setup and Installation

### Prerequisites
* Node.js (Version 18.x or higher)
* Docker Desktop
* NPM or Yarn

### Environment Configuration
1. Create a `.env` file in the root directory.
2. Define the following variables:
   * DATABASE_URL (Connection string for the PostgreSQL container)
   * JWT_SECRET (Secret key for authentication tokens)

### Deployment with Docker
Start the infrastructure services:
```bash
docker-compose up -d

Apply database schema migrations:

```bash
npx prisma migrate dev

Launch the application in watch mode:

```bash
npm run start:dev