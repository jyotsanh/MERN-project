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

const {ProductController, TopProductController, AddProductController, EditProductController, DeleteProductController} = require("../controllers/ProductsController");
const AddProductMiddleware = require("../middleware/addProductMiddleware");

router.get("/products", ProductController);
router.get("/top-products", TopProductController);

router.post("/add-products", upload.single('image'), AddProductMiddleware, AddProductController);
router.put("/edit-product/:id", upload.single('image'), AddProductMiddleware, EditProductController);
router.delete("/delete-product/:id", DeleteProductController);

module.exports = router;
