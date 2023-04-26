const express = require("express");
const { validateCredentials } = require("../middlewares/auth");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/createOrder", createOrder);
router.get("/getOrder", getOrder);
router.get("/getOrders", getOrders);
router.post("/updateOrder", validateCredentials, updateOrder);
router.delete("/deleteOrder", validateCredentials, deleteOrder);

module.exports = router;
