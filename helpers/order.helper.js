const Product = require("../models/product.model");
const OrderDetails = require("../models/orderDetails.model");
const OrderAddress = require("../models/orderAddress.model");
exports.calculatePrice = async (cart) => {
  let totalPrice = null;
  for (let i = 0; i < cart.length; i++) {
    let id = cart[i].productId;
    let quantity = cart[i].quantity;
    let product = await Product.findOne({ _id: id });
    totalPrice += product.price * quantity ?? 0;
  }
  return totalPrice;
};

exports.storingCartItems = async (cart, orderId) => {
  let items = [];
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      const orderItem = await OrderDetails.create({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
      });
      items.push(orderItem);
    }
  }
  return items;
};
exports.storingOrderAddress = async (address) => {
  const orderAddress = await OrderAddress.create({
    address: address.address,
    city: address.city,
    zipCode: address.zipCode,
  });
  return orderAddress;
};
