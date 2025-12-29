# 🛒 FreshCart - E-Commerce Platform

A modern, full-stack e-commerce platform built with React and Node.js, featuring product browsing, shopping cart, order management, and seller dashboard.

![FreshCart](https://img.shields.io/badge/FreshCart-E-Commerce-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)

## 🌟 Features

### Customer Features
- 🏠 **Homepage** with featured products and categories
- 🔍 **Product Search** and filtering
- 📦 **Product Categories** browsing
- 🛒 **Shopping Cart** with add/remove/update functionality
- 👤 **User Authentication** (Register/Login)
- 📍 **Address Management** for delivery
- 📋 **Order Management** (View order history)
- 💳 **Cash on Delivery (COD)** payment option

### Seller Features
- 🔐 **Seller Dashboard** with authentication
- ➕ **Add Products** with image upload (Cloudinary)
- 📊 **Product Management** (View all products)
- 📦 **Order Management** (View customer orders)

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 5.4.11** - Build tool
- **React Router DOM 7.8.0** - Routing
- **TailwindCSS 4.1.11** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.2.1** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling
- **Bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20.x or higher)
- **npm** (v10.x or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for image uploads)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/GreenCart.git
cd GreenCart
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greencart
# OR for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/greencart

# JWT Secret (generate a secure random string)
JWT_SECRET=your_secure_jwt_secret_here

# Seller Credentials
SELLER_EMAIL=seller@greencart.com
SELLER_PASSWORD=your_seller_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
# OR
npm run server
```

The backend will run on `http://localhost:4000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=৳
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
GreenCart/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (AppContext)
│   │   ├── assets/        # Images and other assets
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js application
│   ├── configs/           # Configuration files
│   │   ├── db.js          # MongoDB connection
│   │   └── cloudinary.js  # Cloudinary setup
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 4000) |
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `SELLER_EMAIL` | Seller login email | Yes |
| `SELLER_PASSWORD` | Seller login password | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND_URL` | Backend API URL | Yes |
| `VITE_CURRENCY` | Currency symbol | Yes |

## 🚢 Deployment

### Deploy to Vercel

#### Frontend Deployment

1. Navigate to `client` directory
2. Run `vercel` (or connect via Vercel Dashboard)
3. Set **Root Directory** to `client`
4. Add environment variables in Vercel Dashboard
5. Deploy

#### Backend Deployment

1. Navigate to `server` directory
2. Run `vercel` (or connect via Vercel Dashboard)
3. Set **Root Directory** to `server`
4. Add all environment variables in Vercel Dashboard
5. Deploy

For detailed deployment instructions, see [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 📝 Available Scripts

### Backend
```bash
npm start      # Start production server
npm run server # Start development server with nodemon
npm run dev    # Start development server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

## 🔐 Authentication

### User Authentication
- Users can register and login
- JWT tokens stored in HTTP-only cookies
- Protected routes for authenticated users

### Seller Authentication
- Separate seller login system
- Protected seller dashboard routes

## 🛍️ API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/is-auth` - Check authentication status

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Seller only)
- `GET /api/product/list-seller` - Get seller's products

### Cart Routes
- `POST /api/cart/update` - Update cart items
- `GET /api/cart/get` - Get cart items

### Order Routes
- `POST /api/order/cod` - Place COD order
- `GET /api/order/user` - Get user orders

### Address Routes
- `POST /api/address/add` - Add delivery address
- `GET /api/address/get` - Get user addresses

## 🎨 Features in Detail

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Image Upload**: Product images stored on Cloudinary
- **Real-time Cart**: Shopping cart syncs with backend
- **Order Tracking**: View order history and status
- **Category Filtering**: Browse products by category
- **Search Functionality**: Search products by name

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name - https://github.com/Joy773

## 🙏 Acknowledgments

- Vercel for hosting platform
- MongoDB Atlas for database hosting
- Cloudinary for image storage
- All open-source contributors

---

⭐ If you find this project helpful, please consider giving it a star!
