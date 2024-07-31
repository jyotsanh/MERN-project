const express = require("express");
router = express.Router();


const {AddOrderController,CompletedOrderController} = require("../controllers/OrderController");
const UserAuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");
const CheckIncomingOrderMiddleWare = require("../middleware/AuthenticationMiddleware");
const {PayementMiddleWare} = require("../middleware/PayementMiddleware");

router.post("/order",CheckIncomingOrderMiddleWare,UserAuthenticationMiddleware,PayementMiddleWare,AddOrderController); //Add CompletedOrderController needs to be implemented yet

module.exports = router;