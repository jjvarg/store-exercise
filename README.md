# store-exercise

Database-less Express React Node e-Commerce webapp

# Install

`npm install`

---

# Things to add

- Create a `.env` file in root of the server folder and add the following as `key = value`
  - STRIPE_KEY = `Your Stripe API Key`
  - CLIENT_URL = `Default for Vite is http://localhost:5173`
  - COOKIE_SECRET = `Any value`

---

# Run

- To start the Node backend, cd to the server folder and enter
  `npm start`
- To start the React frontend, cd to the client folder and enter
  `npm run dev`

---

# Optimizations/Known Issues

- Cart Modal does not correctly display product info due to promise issue (Sorry)

- The Add Products page currently has basic functionality but can be accessed from '/add-product'. Adding a product pushes a new object to server memory. If this product does not have a valid Stripe ID, and you try to checkout, the server will crash...
