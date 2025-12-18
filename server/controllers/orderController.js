import Stripe from "stripe";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const TAX_RATE = 0.02;

const calcAmountWithTax = async (items) => {
  let amount = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) return null;
    amount += product.offerPrice * item.quantity;
  }
  amount += Math.floor(amount * TAX_RATE);
  return amount;
};

// Place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!address || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    const amount = await calcAmountWithTax(items);
    if (amount === null) {
      return res.json({ success: false, message: "Invalid product in order" });
    }

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Place order Stripe : (route not wired yet)
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const origin = req.headers.origin || process.env.FRONTEND_URL;

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!origin) return res.json({ success: false, message: "Missing origin" });
    if (!address || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    const productData = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Invalid product in order" });
      }
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
    }

    const amount = await calcAmountWithTax(items);
    if (amount === null) {
      return res.json({ success: false, message: "Invalid product in order" });
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * (1 + TAX_RATE)) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get orders by User ID : /api/order/user
export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.json({ success: false, message: "Unauthorized" });

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get All orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};