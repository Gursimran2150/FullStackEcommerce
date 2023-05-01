const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//realted to logged in user

exports.registerUser = async(req,res,next)=>{
    
     try{
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width:150,
            crop:"scale",
        })
        const {name,email,password} = req.body;
        const user = await User.create({
            name,
            email,
            password,

            avatar:{
                public_id: myCloud.public_id,
                url:myCloud.secure_url
            }

        });

        sendToken(user,201,res);
    }catch(err){
        res.status(500).json({
            sucess:false,
            err:err
        });
    }
}

exports.loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                sucess:false,
                err:{
                    message:"please provide email and password"
                }
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                sucess:false,
                err:{
                    message:"invalid email or password"
                }
            })
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(401).json({
                sucess:false,
                err:{
                    message:"invalid email or password"
                }
            })
        }

      sendToken(user,200,res);

    }catch(e){
        res.status(500).json({
            sucess:false,
            err:e
        });
        console.log(e);
    }
}

exports.logout = async(req,res,next)=>{
    try{
        res.cookie('token',null,{
            expires:new  Date(Date.now()),
            httpOnly:true
        })
        res.status(500).json({
            sucess:true,
            message:"logout"
        });
        

    }catch(e){
        res.status(500).json({
            sucess:false,
            err:e
        });
        console.log(e);
    }
}

exports.forgotPassword =async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({
                sucess:false,
                err:{
                    message:"invalid email"
                }
            })
        }

        // get reset token
        const resetToken = user.getResetPasswordToken();
        console.log('resetPasswordToken:', user.resetPasswordToken);
        console.log('resetPasswordExpires:', user.resetPasswordExpires);

        await user.save({validateBeforeSave:false});
        // create reset url
        const resetUrl = `${req.protocol}://${req.get("host")}/api/vi/password/reset/${resetToken}`

        const message =  `Your password reset token is -: \n\n ${resetUrl}  \n\n If you have not requested this email then please ignore it`;

        try{

            await sendEmail({
                email:user.email,
                subject:"Ecommerce pass token",
                message

            })
            res.status(200).json({
                sucess:true,
                message:`Email sent to ${user.email} successfully`,
            })



        }catch(e){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave:false});
            return res.status(400).json({success:false,error:e})
        }


    }catch(e){

    }
}

// reset the pass using email
exports.resetPasword = async(req,res,next)=>{
    try{

        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

        //console.log('resetPasswordToken:', resetPasswordToken);

        const user = await User.findOne({
            resetPasswordToken,
            //resetPasswordExpire:{$gt: new Date()}
        }).catch(err => {
            console.error(err);
        });

        console.log('user:', user);
        console.log(`resetPasswordToken: ${resetPasswordToken}`);
        console.log(`resetPasswordExpire: ${JSON.stringify({$gt: new Date()})}`);
        

        if(!user){
            return res.status(400).json({
                sucess:false,
                err:{
                    message:"invalid token"
                }
            });
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({
                sucess:false,
                err:{
                    message:"password does not match"
                }
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        sendToken(user,200,res);

    }catch(e){
        console.error(e);
        res.status(500).json({
            sucess:false,
            error: e.message || 'Internal server error'
        });
    }
}











// related to admin user modifications

exports.getUserDetails = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        res.status(200).json({
            sucess:true,
            user
        });

    }catch(e){
        res.status(401).json({
            sucess:false,
            err:e
        })
    }
}

exports.updateUserPassword = async(req,res,next)=>{
    try{

        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
        if(!isPasswordMatched){
            return res.status(401).json({
                sucess:false,
                err:{
                    message:"invalid old password"
                }
            })
        }
        if(req.body.newPassword != req.body.confirmPassword){
            return res.status(401).json({
                sucess:false,
                err:{
                    message:"pass and confirm pass do not match"
                }
            })
        }

        user.password = req.body.newPassword;
        await user.save();
        sendToken(user,200,res);

    }catch(e){
        res.status(500).json({
            sucess:false,
            err:e
        });
    }
}

exports.updateUserProfile  = async(req,res,next) =>{

   try{
    const newUserData = {
        name : req.body.name,
        email:req.body.email,
    }

    //we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        sucess:true,
        user
    })
   }catch(e){
    res.status(500).json({
        sucess:false,
        err:e
    })
   }

}


//admin
exports.getAllUsers = async(req,res,next)=>{
   try{
    const users = await User.find();

    res.status(200).json({
        sucess:true,
        users
    })
   }catch(e){
    res.status(500).json({
        sucess:false,
        err:e
    })
   }
}

//admin get single user
exports.getSepficUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            sucess:false,
            err:{
                message:"user not found"
            }
        })
    }
    res.status(200).json({
        sucess:true,
        user
    })
    }catch(e){
        res.status(401).json({
            sucess:false,
            err:e
        }
            )
    }
}

// admin update user role
exports.updateUserProfileAdmin  = async(req,res,next) =>{

    try{
     const newUserData = {
         name : req.body.name,
         email:req.body.email,
         role:req.body.role
     }
 
     //we will add cloudinary later
 
     const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
         new:true,
         runValidators:true,
         useFindAndModify:false
     })
 
     res.status(200).json({
         sucess:true,
         user
     })
    }catch(e){
     res.status(500).json({
         sucess:false,
         err:e
     })
    }
 
 }

 //delete user
 exports.deleteUser = async(req,res,next) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                sucess:false,
                err:{
                    message:"user not found"
                }
            })
        }
        res.status(200).json({
            sucess:true,
            user
        })
    }catch(e){
        res.status(500).json({
            sucess:false,
            err:e
        })
    }
 }