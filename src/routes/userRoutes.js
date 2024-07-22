// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/userController');
const bcryptMiddleware = require ('../middlewares/bcryptMiddleware');
const jwtMiddleware = require ('../middlewares/jwtMiddleware')

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post ('/', controller.checkByEmail, controller.readbyusernameexistance, bcryptMiddleware.hashPassword,controller.createNewUser, jwtMiddleware.generateToken, controller.readUserbyId201)
router.get ('/', controller.readAllUser)
router.get ('/:id', controller.readUserbyIdWithPoints)
router.put ('/:id', controller.readPASSById, bcryptMiddleware.comparePassword, controller.checkByNameAndEmail, controller.updateUserById,controller.readUserbyId200)
router.delete ('/:id', controller.deleteUserById)
router.post("/login", controller.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
