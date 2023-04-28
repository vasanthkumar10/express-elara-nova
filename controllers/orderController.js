const { Order, validateOrder } = require("../models/order");
const {
  created,
  clientError,
  dataNotFound,
  success,
  unauthorised,
} = require("../utils/response");

async function createOrder(req, res) {
  const { error } = validateOrder(req.body);
  if (error) return clientError(error.details[0].message);

  const { customerName, product, price, quantity } = req.body;

  const order = new Order({
    customerName,
    product,
    price,
    quantity,
    totalPrice: quantity * price,
  });

  const newOrder = await order.save();
  return created({
    msg: "Successfully created the order",
    data: newOrder,
  });
}

async function getOrder(req, res) {
  const { id } = req.query;
  const order = await Order.findById(id);

  if (!order) return dataNotFound("Order not found...");

  return success({
    data: order,
  });
}

async function getOrders(req, res) {
  const orders = await Order.find();

  return success({
    data: orders,
  });
}

async function updateOrder(req, res) {
  const { id, price } = req.body;

  const order = await Order.findById(id);
  if (!order) return dataNotFound("Order not found...");

  order.price = price;
  order.totalPrice = price * order.quantity;

  const updatedOrder = await order.save();
  return success({
    msg: "Order updated successfully",
    data: updatedOrder,
  });
}

async function deleteOrder(req, res) {
  const { id } = req.body;

  const { isAdmin } = req.user;
  if (!isAdmin) return unauthorised("Unauthorised");

  const order = await Order.findById(id);
  if (!order) return dataNotFound("Order not found...");

  const deletedOrder = await Order.findByIdAndDelete(id);
  return success({
    msg: "Order deleted successfully",
    data: deletedOrder,
  });
}

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
