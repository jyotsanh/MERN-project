const express = require("express");
router = express.Router()
const LoginMiddleware = require("../middleware/loginmiddleware")
const RegisterMiddleware = require("../middleware/registermiddleware")
const {AdminRegisterController,LoginAdmin,fetchOrders,updateOrderStatus} = require("../controllers/adminController");
const { AuthenticationMiddleware } = require("../middleware/AuthenticationMiddleware");

router.post("/admin-login",LoginMiddleware,LoginAdmin) // put a middle ware which will ensure no user can reach admin
router.post("/admin-register",RegisterMiddleware,AdminRegisterController)
// GET request to fetch orders
router.get('/get-orders', AuthenticationMiddleware, fetchOrders);
router.put('/update-order-status/:orderId', AuthenticationMiddleware, updateOrderStatus);


module.exports = router;