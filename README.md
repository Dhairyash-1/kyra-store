# KyraStore - E-Commerce Website for Fashion & Clothing 👗🛍️

Welcome to **KyraStore**, a fully functional e-commerce platform for fashion and clothing enthusiasts. Built with cutting-edge technologies, this project provides a seamless shopping experience for users and a robust admin panel for managing products and orders.

---

## 🌟 Features

### User Features:

- **Product Catalog Page** 🛒: Filter, sort, and paginate products by color, size, category, and subcategory.
- **User Authentication** 🔐: Register, login, and recover your password via email OTP.
- **Wishlist** ❤️: Add products to your wishlist with an **optimistic UI update** using Redux Toolkit.
- **Product Search** 🔎: Quickly find what you're looking for.
- **Profile Management** 👤: Manage your profile, addresses, wishlist, and orders.
- **Cart Functionality** 🛍️:
  - Add items to your cart.
  - Adjust quantities.
  - Apply coupon codes.
  - Select a shipping address.
  - Make payments securely with **Stripe**.
- **Product Page** 📄:
  - Select multiple variants (color and size).
  - View images for each variant.
- **Fully Responsive** 📱: A smooth experience on all devices.

### Admin Panel Features:

- **Product Management** ✏️:
  - Add new products with multiple variants, sizes, prices, and images.
  - Save products as drafts or publish them.
  - Edit product information.
- **Order Management** 📦: View and manage orders efficiently.

---

## 🛠️ Tech Stack

### Frontend:

- **TypeScript**
- **ReactJS**
- **Redux Toolkit** (State Management)
- **RTK Query** (API Caching)

### Backend:

- **TypeScript**
- **Express.js**
- **PostgreSQL** (Database)
- **Prisma** (ORM)

### Deployment:

- **Frontend**: AWS S3 with CloudFront 🌐
- **Backend**: AWS EC2 with Nginx 🚀

---

## 🌐 Live Demo and Video Walkthrough

### 🔗 Live Website

[KyraStore E-Commerce Website](https://kyrastore.dhairyashgupta.com)

### 🎥 Video Demo

[Watch the Full Walkthrough on YouTube](https://www.youtube.com/watch?v=YI0oWEPoTzA)

---

## 🚀 Upcoming Features

- **Performance Optimization** ⚡: Integrate **Redis** for better performance.
- **Email Notifications** 📧:
  - Order confirmation emails.
  - Notifications for abandoned carts.
- **Admin Panel Enhancements** 🛠️:
  - Manage and create coupon codes.
  - Set up sales and promotions.

---

## 📸 Screenshots

Here are some glimpses of the KyraStore e-commerce website:

### 1️⃣ Homepage

## ![KyraStore Homepage](https://kyrastore-ecom.s3.ap-south-1.amazonaws.com/Products/screenshots/homepage.png)

### 2️⃣ Product Catalogue with Filters

![Product Catalogue](https://kyrastore-ecom.s3.ap-south-1.amazonaws.com/Products/screenshots/cataloguepage.png)

## 🖥️ Getting Started

### Prerequisites:

- Node.js
- PostgreSQL
- AWS account

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/kyra-store.git
   ```
2. Install dependencies:
   ```bash
   cd kyra-store/client
   npm install
   ```
   ```bash
   cd ../server
   npm install
   ```
3. Set up the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Configure environment variables in `.env`.
5. Start the development server:
   ```bash
   npm start
   ```

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 🌟 Connect

If you have any questions, feel free to reach out to me!
