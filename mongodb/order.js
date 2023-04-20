const express = require("express");
const mongoose = require("mongoose");
const log = require("debug")("app:db");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to the mongodb..."))
  .catch((err) => console.log("Error occured while connecting mongodb", err));

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  product: String,
  price: Number,
  quantity: Number,
  date: { type: Date, default: Date.now },
  totalPrice: Number,
});

// model
const Order = mongoose.model("Order", orderSchema);

app.post("/createOrder", async (req, res) => {
  const { customerName, product, price, quantity } = req.body;
  log("Creating a new order");

  try {
    const order = new Order({
      customerName,
      product,
      price,
      quantity,
      totalPrice: quantity * price,
    });

    const newOrder = await order.save();
    return res.status(201).json({
      msg: "Successfully created the order",
      data: newOrder,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
});

app.get("/getOrder", async (req, res) => {
  const { id } = req.query;
  try {
    const order = await Order.findById(id);

    if (!order) return res.status(404).send("Order not found...");

    return res.status(200).json({
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
});

app.post("/updateOrder", async (req, res) => {
  const { id, price } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).send("Order not found...");

    order.price = price;
    order.totalPrice = price * order.quantity;

    const updatedOrder = await order.save();
    return res.status(200).json({
      msg: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
});

app.delete("/deleteOrder", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    return res.status(200).json({
      msg: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
});

app.listen(5000, () => console.log("Listening to the port 5000...."));
