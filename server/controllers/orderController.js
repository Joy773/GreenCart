import Order from "../models/Order.js";
import Product from "../models/Product.js"; 

// Place order COD : /api/order/place-order-cod

export const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items, address} = req.body;
        if(!address || items.length === 0) {
        return res.json({success: false, message: 'Invalid Data'})
    }
    let amount = await items.reduce(async (acc, item) => {
        const product = await Product.findById(item.product);
        return (await acc) + product.offerprice * item.quantity;
    }, 0); 
    //Add tax charge (2%)
    amount += Math.floor(amount * 0.02);
    await Order.create({
        userId, 
        items,
        amount, 
        address, 
        paymentType: 'COD',
        isPaid: false,
    })
    return res.json({success: true, message: 'Order Placed Successfully'})
    }
    catch(error) { 
        return res.json({success: false, message: error.message})
    }
}

// Get orders by User ID : /api/order/user
export const getOrderByUserId = async (req, res) => {
    try
    {
        const {userId} = req.body;
        const orders =  await Order.find({
            userId,
            $or: [{paymentType: 'COD'}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})
        return res.json({success: true, orders})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
} 