import User from "../models/User.js";


//update user cartData : /api/cart/update
export const updateCart = async (req, res) => {
    try
    {
        // authUser middleware injects req.body.userId from the cookie token
        const {userId, cartItems} = req.body;
        if(!userId){
            return res.json({success: false, message: "Unauthorized"});
        }
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: 'Cart Updated Successfully'})
    }
    catch(error){
        res.json({success: false, message: error.message})
        console.log(error);
    }
}