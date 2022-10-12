import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAdmin = async(req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.redirect('back');
    }
    
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    const user = await User.findOne({where: { id }});
        
    if (user.role !== 'ADMIN_ROLE') {
        return res.redirect('back');
    }

    next();
}