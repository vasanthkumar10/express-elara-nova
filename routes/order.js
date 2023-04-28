const express = require("express");
const { validateCredentials } = require("../middlewares/auth");
const { errorHandler } = require("../utils/errorHandler");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/createOrder", errorHandler(createOrder));
router.get("/getOrder", errorHandler(getOrder));
router.get("/getOrders", errorHandler(getOrders));
router.post("/updateOrder", validateCredentials, errorHandler(updateOrder));
router.delete("/deleteOrder", validateCredentials, errorHandler(deleteOrder));

module.exports = router;
