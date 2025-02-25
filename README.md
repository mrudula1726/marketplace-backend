# Marketplace Backend

This is the backend for the **Simplified Marketplace Application**, built using **Node.js, Express.js, and Airtable** as the database.

## Features
- **Product Management:** Add, update, delete, and fetch products.
- **Order Management:** Place, retrieve, and manage orders.
- **REST API Design:** Well-structured API endpoints.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** Airtable
- **API Testing:** Postman

## Installation & Setup

### 1. Clone the Repository
```sh
git clone <repository_url>
cd marketplace-backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Environment Variables
Create a `.env` file and configure:
```env
PORT=5000
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

### 4. Run the Server
```sh
npm start
```

## API Endpoints

### **Products**
- `GET /products` - Fetch all products
- `POST /products` - Add a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### **Orders**
- `GET /orders` - Fetch all orders
- `POST /orders` - Place an order
- `PUT /orders/:id` - Update order details
- `DELETE /orders/:id` - Delete an order

## Deployment
- Deployed using **Render**

## Author
**Shasthrulla Mrudula**
