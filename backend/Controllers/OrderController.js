const Order= require('../Models/Order')
const Product= require('../Models/Product')
const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncError=require('../Middleware/CatchAsyncError')
const features =require('../utils/Features')

//create
exports.createOrder=async(req,res,next)=>{
    console.log("order")
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      
        paidAt:Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    });


}




//  Get Single order
exports.getSingleOrder = async (req,res,next) =>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    res.status(200).json({
        success: true,
        order
    });
};

// Get all orders
exports.getAllOrders =async (req,res,next) =>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json({
        success: true,
        orders
    });
};

// Get All orders ---Admin
exports.getAdminAllOrders =async (req,res,next) =>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
};

// update Order Status ---Admin
exports.updateAdminOrder = async (req, res, next) => {
    

    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.productId, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  };
  
  async function updateStock(id, quantity) {
      
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }


  // delete Order ---Admin
exports.deleteOrder = async (req,res,next) =>{

    const order = await Order.findById(req.params.id);
    
    if(!order){
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
};