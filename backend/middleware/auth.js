const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticatedUser = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user= await User.findById(decodedData.id);
    next();
    

    if(!decodedData){
        return res.status(401).json({message:"Unauthorized"});
    }
}

const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(res.status(401).json({message:"Unauthorized"}));
        }
        next();
    }
}

module.exports = {
    isAuthenticatedUser,
    authorizeRoles,
  };