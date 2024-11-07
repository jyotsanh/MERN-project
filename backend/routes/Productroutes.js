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
        allowed_formats: ['jpg', 'png', 'webp', 'jpeg'], // List of allowed formats
        format: async (req, file) => {
            // Get the file extension
            const extension = file.originalname.split('.').pop().toLowerCase();
            // If it's one of our allowed formats, use that. Otherwise, default to png.
            return ['jpg', 'png', 'webp', 'jpeg'].includes(extension) ? extension : 'webp';
        },
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
  DeleteProductController,
  RecentProductsController,
  SliderProductsController,
  FilterProductsController
} = require("../controllers/ProductsController");

// Products Middleware
const AddProductMiddleware = require("../middleware/addProductMiddleware");
const { AuthenticationMiddleware, CheckIncomingOrderMiddleWare, UserAuthenticationMiddleware } = require("../middleware/AuthenticationMiddleware");

router.get("/products", ProductController); // admin can see all product details
router.get("/top-products", TopProductController); // top products for User
router.get("/products/:id", ProductDetailsId); // Product info with id endpoint
router.get("/user-products", UserProductsController); // all product info for User
router.get("/recent-products", RecentProductsController); // all product info for User
router.get("/slider-products", SliderProductsController); // slider product info for User



router.post("/products/filter", FilterProductsController); // filter product info for User
// adding, editing, and deleting products requires authentication: 'AuthenticationMiddleware'
router.post("/add-products", upload.array('images', 4), AddProductMiddleware, AuthenticationMiddleware, AddProductController);
router.put("/edit-product/:id", upload.array('newImages', 4), AddProductMiddleware, AuthenticationMiddleware, EditProductController);
router.delete("/delete-product/:id", AuthenticationMiddleware, DeleteProductController);

module.exports = router;
