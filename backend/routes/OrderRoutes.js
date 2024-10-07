const express = require("express");
router = express.Router();


const {AddOrderController,CompletedOrderController,getUserOrder} = require("../controllers/OrderController");
const {UserAuthenticationMiddleware} = require("../middleware/AuthenticationMiddleware");
const {CheckIncomingOrderMiddleWare} = require("../middleware/AuthenticationMiddleware");
const {PayementMiddleWare} = require("../middleware/PayementMiddleWare");

router.post("/order",CheckIncomingOrderMiddleWare,UserAuthenticationMiddleware,PayementMiddleWare,AddOrderController); //Add CompletedOrderController needs to be implemented yet
router.get("/user-order",UserAuthenticationMiddleware,getUserOrder)
module.exports = router;