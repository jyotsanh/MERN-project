const express = require("express");
router = express.Router()

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });

  const upload = multer({ storage: storage });

const {ProductController,TopProductController,AddProductController} = require("../controllers/ProductsController");
const AddProductMiddleware = require("../middleware/addProductMiddleware")

router.get("/products",ProductController)
router.get("/top-products",TopProductController)


router.post("/add-products",upload.single('image'),AddProductMiddleware,AddProductController)
module.exports = router;