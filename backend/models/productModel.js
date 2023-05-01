const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please Enter Product Name']
        },
        description:{
            type:String,
            required:[true,'Please Enter Product Description']
        },
        price:{
            type:Number,
            required:[true,'Please Enter Product Price'],
            maxLength:[8,"Price cannot exceeds 8 charcters"]
        },
        rating:{
            type:Number,
            default:0
        },
        images:[{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    }],
    category:{
        type:String,
        required:[true,'Please Enter Product Category']

    },
    Stock:{
        type:Number,
        required:[true,'Please Enter Product Stock'],
        maxLength:[4,'Stock cannot exceeds 10000'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:[true,'Please Enter Reviewer Name']
            },
            rating:{
                type:Number,
                required:[true,'Please Enter Reviewer Rating']
            },
            comment:{
                type:String,
                required:[true,'Please Enter Reviewer Comment']
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

    }
)

module.exports =  mongoose.model('Product',productSchema);