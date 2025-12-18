import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Unauthorized"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            // req.body may be undefined on GET requests or when no body parser runs
            if (!req.body) req.body = {};
            req.body.userId = tokenDecode.id;
            // also expose it on the request for convenience
            req.userId = tokenDecode.id;
        }
        else
        {
            return res.json({success: false, message: "Not Authorized"});
        }
        next();
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;