const express = require("express");
const { validateCredentials } = require("../middlewares/auth");
const router = express.Router();
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/createOrder", validateCredentials, createOrder);
router.get("/getOrder", getOrder);
router.post("/updateOrder", updateOrder);
router.delete("/deleteOrder", deleteOrder);

module.exports = router;
