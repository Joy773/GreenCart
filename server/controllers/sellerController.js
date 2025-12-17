import jwt from "jsonwebtoken";

//Login Seller : /api/seller/login

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL)
            {
                const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"});
                
                res.cookie("sellerToken", token, {
                    httpOnly: true, // Prevent JS to access the cookie
                    secure: process.env.NODE_ENV === "production", //use secure cookies in production
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //prevent CSRF attacks
                    maxAGE: 7 * 24 * 60 * 60 * 1000, // 7 days
                    path: "/", // Important: must match the path used when clearing the cookie
                  });
                  return res.json({success: true, message: "Logged in successfully"})
            }
            else
            {
                return res.json({success: false, message: "Invalid email or password"})
            }
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//seller is authenticated or not : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try 
    {
        return res.json({success: true, message: "Seller is authenticated"})
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//Logout Seller : /api/seller/logout
export const logout = async (req, res) => {
    try {
      res.clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: "/", // Important: must match the path used when setting the cookie
      });
      return res.json({ success: true, message: "Logged out" });
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
    }
  };