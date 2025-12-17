import jwt from "jsonwebtoken";

const authUser = async (req, resizeBy, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Unauthorized"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }
        else
        {
            return res.json({success: false, message: "Not Authorized"});
        }
        next();
    }
    catch (error) {
        response.json({ success: false, message: error.message });
    }
}

export default authUser;