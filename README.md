# ERP-CRM-using-React-and-Node.js

This repository contains a full-featured **Enterprise Resource Planning (ERP)** application designed to manage core business functions. Built with the **MERN stack**, it facilitates customer relations, inventory tracking, employee records, and dynamic invoicing with a secure RESTful API and a responsive dashboard.

---

## 💻 Tech Stack Overview

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express | RESTful API, business logic, and PDF generation services. |
| **Database** | MongoDB, Mongoose | NoSQL database with strict data modeling for ERP entities. |
| **Frontend** | React (Vite) | Single Page Application (SPA) for the user interface. |
| **UI Framework** | Ant Design (Antd) | Enterprise-level UI components for consistent styling. |
| **Authentication** | JWT, bcrypt | Secure token-based authentication and password hashing. |

---

## 🚀 Getting Started

### 1. Prerequisites

* Node.js (LTS recommended)
* MongoDB Instance (Local or MongoDB Atlas connection string)

### 2. Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd nex-erp
    ```

2.  **Install Dependencies:**
    You need to install dependencies for both the backend and frontend.
    ```bash
    # Backend Setup
    cd backend
    npm install

    # Frontend Setup
    cd ../frontend
    npm install
    ```

3.  **Setup Environment Variables:**
    
    **Backend (`/backend/.env`):**
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/ERP  # Or your Atlas URI
    JWT_SECRET=your_strong_secret_key_here
    JWT_EXPIRE=7d
    ```

    **Frontend (`/frontend/.env.local`):**
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Seed the Database (Auto-Admin):**
    The application handles the initial seed automatically. When the backend server starts, it checks for an admin user.
    * **Default User:** `admin@nexerp.com`
    * **Default Password:** `password`

5.  **Run the Application:**
    You will need two terminal windows.

    ```bash
    # Terminal 1: Start Backend
    cd backend
    npm run dev
    # Output: "MongoDB Connected" & "Admin created..."

    # Terminal 2: Start Frontend
    cd frontend
    npm run dev
    # Opens on http://localhost:5173
    ```

---

## 🗂️ File Structure

The project is divided into two main directories: `/backend` and `/frontend`.

### ⚙️ Backend Files (`/backend`)

| Path | File Name | Description & Key Functionality |
| :--- | :--- | :--- |
| Root | **server.js** | Entry Point: Connects to DB, runs Admin seed check, starts server. |
| Controllers | **authController.js** | Handles Login (`/login`), Register (`/register`), and User Info (`/me`). |
| Controllers | **dashboardController.js** | Aggregates metrics: Revenue, Total Orders, Customer counts. |
| Controllers | **customerController.js** | Standard CRUD operations for managing Client data. |
| Controllers | **productController.js** | Manages Inventory items, SKUs, and Stock levels. |
| Controllers | **employeeController.js** | HR module for managing Employee records. |
| Controllers | **invoiceController.js** | Handles creation of invoice records and **dynamic PDF generation**. |
| Routes | **[resource]Routes.js** | Maps API endpoints to their respective controllers (e.g., `/api/invoices`). |

### ⚛️ Frontend Files (`/frontend/src`)

| Path | File Name | Description & Key Functionality |
| :--- | :--- | :--- |
| Root | **App.jsx** | Main Layout wrapper; defines routes and Sidebar structure. |
| Services | **api.js** | Axios instance; automatically attaches `x-auth-token` from localStorage. |
| Auth | **Login.jsx** | Handles user authentication and token storage. |
| Auth | **PrivateRoute.jsx** | Route wrapper that protects internal pages from unauthenticated access. |
| Dashboard | **Dashboard.jsx** | Fetches and visualizes real-time business statistics. |
| Modules | **CustomerList.jsx** | Data table for customers with Edit/Delete actions. |
| Modules | **ProductList.jsx** | Inventory view; manages stock counts and product details. |
| Modules | **InvoiceList.jsx** | Lists invoices and includes a **Download PDF** button triggering the backend. |

---

## 🛠️ Key Implementation Details

The following workflows are critical to the system's operation.

### 1. 🔐 Authentication & Security

The system uses a stateless JWT architecture.

| Feature | Implementation | Details |
| :--- | :--- | :--- |
| **Token Storage** | `localStorage` | Upon login, the JWT is stored client-side. |
| **Request Interception** | `api.js` | The Axios interceptor injects the token into the `x-auth-token` header for every request. |
| **Password Security** | `bcrypt` | Passwords are hashed before storage; never stored in plain text. |

### 2. 📄 Dynamic Invoice Generation

The invoicing system does not just store data; it produces physical documents.

| Feature | Implementation | Details |
| :--- | :--- | :--- |
| **PDF Engine** | Backend Controller | `invoiceController.js` generates PDFs on the fly using data from MongoDB. |
| **Delivery** | Binary Stream | The frontend receives the PDF as a blob and triggers a browser download. |

### 3. 👤 Automatic Admin Seeding

To ensure the system is usable immediately after installation without manual database insertion.

| Feature | Implementation | Details |
| :--- | :--- | :--- |
| **Logic** | `server.js` | On boot, checks `User` collection count. If 0, creates the default Admin. |
| **Credentials** | Hardcoded (Dev) | Creates `admin@nexerp.com` / `password`. Change immediately in production. |
