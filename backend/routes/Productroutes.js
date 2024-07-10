const express = require("express");
router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, '../frontend/public/uploads/Products/');

    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
//Controller : 
const {ProductController, TopProductController, AddProductController, EditProductController, DeleteProductController} = require("../controllers/ProductsController");

// Products Middleware
const AddProductMiddleware = require("../middleware/addProductMiddleware");
const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

router.get("/products", ProductController);
router.get("/top-products", TopProductController);


// adding,editing and deleting products requires authentication : 'AuthenticationMiddleware'
router.post("/add-products", upload.single('image'), AddProductMiddleware, AuthenticationMiddleware,AddProductController);
router.put("/edit-product/:id", upload.single('image'), AddProductMiddleware,AuthenticationMiddleware, EditProductController);
router.delete("/delete-product/:id",AuthenticationMiddleware, DeleteProductController);

module.exports = router;
