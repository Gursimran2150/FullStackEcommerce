const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSepficUser, updateUserProfileAdmin, deleteUser, resetPasword } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');



const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);

router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updateUserPassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route('/admin/users/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSepficUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserProfileAdmin).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

router.route("/password/reset/:token").put(resetPasword)

module.exports = router;