const express = require("express");
router = express.Router();
const fs = require('fs'); //for folder creation
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const {name} = req.body;
      const uploadPath = path.join(__dirname, `../../frontend/public/uploads/Products/${name}/`);

      fs.mkdir(uploadPath, { recursive: true }, (err) => {

        if (err) {
          return cb(err);
        } else {
          cb(null, uploadPath);
        }

      }); // makdirectory 
      
    }, // destination 
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
//Controller : 
const {ProductController,ProductDetailsId,UserProductsController, TopProductController, AddProductController, EditProductController, DeleteProductController} = require("../controllers/ProductsController");

// Products Middleware
const AddProductMiddleware = require("../middleware/addProductMiddleware");
const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

router.get("/products", ProductController); // admin can see al product details
router.get("/top-products", TopProductController); // top products for User
router.get("/products/:id", ProductDetailsId); // Product info with id endpoint
router.get("/user-products", UserProductsController); // all product info for User


// adding,editing and deleting products requires authentication : 'AuthenticationMiddleware'
router.post("/add-products", upload.single('image'), AddProductMiddleware, AuthenticationMiddleware,AddProductController);
router.put("/edit-product/:id", upload.single('image'), AddProductMiddleware,AuthenticationMiddleware, EditProductController);
router.delete("/delete-product/:id",AuthenticationMiddleware, DeleteProductController);

module.exports = router;
