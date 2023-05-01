const Order = require('../models/orderModel');
const Product = require('../models/productModel');
//creating a new order
exports.newOrder = async(req,res,nexy)=>{
 try{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice

    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(201).json({
        message: 'Order created successfully',
        order,
    })
 }catch(e){
    res.status(500).json({
        message: e.message
    })
 }
}

//get specific order details
exports.getSingleOrder = async(req,res,next)=>{
    console.log(req.params.id)
    try{
       
        const order = await Order.findById(req.params.id).populate("user","name email");

        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            message: "Order found",
            order
        })


    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
}

//get logged in user
exports.getMyOrders = async(req,res,next)=>{
    try{

        const orders = await Order.find({user:req.user._id});

       
        res.status(200).json({
            message: "Order found",
            orders
        })


    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
}

//get all orders -- Admin
exports.getAllOrders = async(req,res,next)=>{
    try{
        const orders = await Order.find();
        const ordersCount = await Order.countDocuments();

        let totalAmount = 0; 
        orders.forEach(order=>{
            totalAmount+=order.totalPrice;
        })
        res.status(200).json({
            message: "Orders found",
            ordersCount,
            totalAmount,
            orders
        })

    }catch(e)
    {
        res.status(500).json({
            message: e.message
        })
    }
}

//update order Status -- Admin
exports.updateOrder = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        })
      }
  
      if (order.orderStatus === "Delivered") {
        return res.status(400).json({
          message: "Order is already Delivered"
        })
      }
  
      for (let i = 0; i < order.orderItems.length; i++) {
        const item = order.orderItems[i];
        await updateStock(item.product, item.quantity);
      }
  
      order.orderStatus = req.body.status;
  
      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }
  
      await order.save({ validateBeforeSave: false });
  
      res.status(200).json({
        message: "Order updated successfully",
        order
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }
  };
  
  async function updateStock(id, quantity) {
    console.log("id-:",id);
    console.log("quantity-:",quantity)
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save();
  }
  

//delete order -- Admin

exports.deleteOrder = async(req,res,next)=>{
    const order = await Order.findByIdAndDelete(req.params.id);
    if(!order){
        return res.status(404).json({
            message: "Order not found"
        })
    }
    res.status(200).json({
        message: "Order deleted successfully",
        order
    })
}