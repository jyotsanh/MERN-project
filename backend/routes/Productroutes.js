const express = require("express");
const router = express.Router();
const fs = require('fs'); // for folder creation
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Products', // Folder where images will be stored on Cloudinary
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => `${Date.now()}_${file.originalname}`,
    },
  });
  
  // Middleware to handle file uploads
  const upload = multer({ storage: storage });

// Controller
const { 
  ProductController,
  ProductDetailsId,
  UserProductsController,
  TopProductController,
  AddProductController,
  EditProductController,
  DeleteProductController
} = require("../controllers/ProductsController");

// Products Middleware
const AddProductMiddleware = require("../middleware/addProductMiddleware");
const { AuthenticationMiddleware, CheckIncomingOrderMiddleWare, UserAuthenticationMiddleware } = require("../middleware/AuthenticationMiddleware");

router.get("/products", ProductController); // admin can see all product details
router.get("/top-products", TopProductController); // top products for User
router.get("/products/:id", ProductDetailsId); // Product info with id endpoint
router.get("/user-products", UserProductsController); // all product info for User

// adding, editing, and deleting products requires authentication: 'AuthenticationMiddleware'
router.post("/add-products", upload.array('images', 4), AddProductMiddleware, AuthenticationMiddleware, AddProductController);
router.put("/edit-product/:id", upload.array('images', 4), AddProductMiddleware, AuthenticationMiddleware, EditProductController);
router.delete("/delete-product/:id", AuthenticationMiddleware, DeleteProductController);

module.exports = router;
