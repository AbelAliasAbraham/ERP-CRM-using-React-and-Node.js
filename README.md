# ERP-CRM-using-React-and-Node.js
NexERP is a modern, full-stack ERP application designed to manage core business functions: customer relations, inventory, employee records, invoicing, and more. It features a Node.js/Express/MongoDB backend with JWT-based authentication, and a React + Ant Design frontend SPA.
---
## Table of Contents
1. [Tech Stack](#tech-stack)  
2. [Prerequisites](#prerequisites)  
3. [Backend Setup](#backend-setup)  
   1. [Installation](#backend-installation)  
   2. [Configuration](#backend-configuration)  
   3. [Seed Data & Admin User](#seed-data--admin-user)  
   4. [Running the Server](#running-the-server)  
4. [Frontend Setup](#frontend-setup)  
   1. [Installation](#frontend-installation)  
   2. [Configuration](#frontend-configuration)  
   3. [Running the App](#running-the-app)  
5. [Key Features](#key-features)  
6. [Project Structure](#project-structure)  
7. [Environment Variables](#environment-variables)  
8. [Contributing](#contributing)  
9. [License](#license)  
---
## Tech Stack
- **Backend**  
  - Node.js, Express  
  - MongoDB (Mongoose ODM)  
  - JWT authentication, bcrypt password hashing  
  - Dynamic PDF generation for invoices  
- **Frontend**  
  - React with Vite bundler  
  - Ant Design UI library  
  - Axios service layer with token interceptor  
---
## Prerequisites
- **Node.js** (v16+)  
- **npm** or **yarn**  
- **MongoDB**  
  - Local installation or MongoDB Atlas account  
---
## Backend Setup
### Installation
\`\`\`bash
# Clone the repo
git clone <repo-url>
cd nex-erp/backend
# Install dependencies
npm install
\`\`\`
### Configuration
Create a \`.env\` file in \`/backend\` with:
\`\`\`ini
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ERP      # or your Atlas connection string
JWT_SECRET=your_strong_secret_key_here       # change for production
JWT_EXPIRE=7d
\`\`\`
### Seed Data & Admin User
On server start, if no admin exists, one is auto-created:
- **Role:** Admin  
- **Email:** admin@nexerp.com  
- **Password:** password  
> _Change this in production!_
### Running the Server
\`\`\`bash
# Development (with nodemon)
npm run dev
# Production
npm start
\`\`\`
Server logs:
\`\`\`
MongoDB Connected
Admin created: admin@nexerp.com / password
\`\`\`
---
## Frontend Setup
### Installation
\`\`\`bash
cd ../frontend
npm install
\`\`\`
### Configuration
Create an \`.env.local\` in \`/frontend\`:
\`\`\`ini
VITE_API_URL=http://localhost:5000/api
\`\`\`
### Running the App
\`\`\`bash
npm run dev
\`\`\`
By default, the app opens at \`http://localhost:5173/\`.
---
## Key Features
- **Authentication**  
  - Login & protected routes via JWT  
  - Role-based access (admin vs. user)
- **Dashboard**  
  - Real-time metrics: revenue, orders, customers, low-stock alerts
- **Customers & HR**  
  - CRUD operations with modal-based forms
- **Inventory Management**  
  - Product list, SKU, pricing, stock levels
- **Invoicing**  
  - Create invoices, dynamic PDF generation, download links
- **Consistent UI**  
  - Ant Design components for tables, forms, layouts
---
## Project Structure
\`\`\`
/
├── backend  
│   ├── controllers/  
│   ├── middleware/  
│   ├── models/  
│   ├── routes/  
│   ├── utils/  
│   └── server.js  
└── frontend  
    ├── public/  
    ├── src/  
    │   ├── components/  
    │   ├── pages/  
    │   ├── services/      # api.js  
    │   └── App.jsx  
    └── vite.config.js  
\`\`\`
---
## Environment Variables
| Name         | Backend                          | Frontend                  |
|--------------|----------------------------------|---------------------------|
| NODE_ENV     | development / production         | —                         |
| PORT         | 5000                             | —                         |
| MONGO_URI    | MongoDB connection string        | —                         |
| JWT_SECRET   | Secret for token signing         | —                         |
| JWT_EXPIRE   | Token expiration (e.g., \`7d\`)  | —                         |
| VITE_API_URL | —                                | Base URL for API calls   |
---
## Contributing
1. Fork the repository  
2. Create a feature branch:  
   \`\`\`bash
   git checkout -b feature/YourFeature
   \`\`\`
3. Commit your changes:  
   \`\`\`bash
   git commit -m "Add YourFeature"
   \`\`\`
4. Push to your fork:  
   \`\`\`bash
   git push origin feature/YourFeature
   \`\`\`
5. Open a Pull Request  
Please follow the existing code style and include relevant tests.
