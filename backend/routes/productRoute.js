const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/products/admin/new').post(createProduct);

router.route('/products/admin/:id').put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
router.delete('/products/admin/:id',deleteProduct);

router.route('/products/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router;
