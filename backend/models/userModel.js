const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            trim:true,
            minlength:[4,"Should have more than 4 letters"],
            maxlength:[50,"Cannot Exceeds 50 letters"]

        
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:[validator.isEmail,"Please Enter a valid Email"]
           
        },
        password:{
            type:String,
            required:[true,"Please Enter your password"],
            minlength:[3,"Password should be greater than 3 letters"],
            maxlength:[20,"Cannot Exceeds 20 letters"],
            select:false
        },
        avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
            type:String,
           default:"user"
        },
        resetPasswordToken:String,
        resetPasswordExpires:Date   
    }
)

userSchema.pre("save",async function (next) {
    if(!this.isModified('password')){
        next()
        
}
this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN 

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.comparePassword = async function(enterPassword){
    return  await bcrypt.compare(enterPassword,this.password)
}

//Generating password reset Token
userSchema.methods.getResetPasswordToken = function(){
    // Genrating token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hashing and adding to user
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpires = Date.now() + 15*60*1000;

    return resetToken;

}



module.exports = mongoose.model('User',userSchema)