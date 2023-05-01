const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();


router.post('/order/new',isAuthenticatedUser,newOrder)
router.get('/order/:id',isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.get('/orders',isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.get('/orders/me',isAuthenticatedUser,getMyOrders);

router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);


module.exports = router;