// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const taskprogressRoutes = require('./taskprogressRoutes');
const secB_studentRoutes = require('./secB_studentRoutes');
const secB_spellsRoutes = require('./secB_spellsRoutes');
const secB_learntSpellRoutes = require ('./secB_learntSpellRoutes');
const secB_tournamentRoutes = require('./secB_tournamentRoutes');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const ca2_messagesRoutes = require ('./ca2_messagesRoutes');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

router.get("/jwt/verify", jwtMiddleware.verifyToken, authController.showTokenVerified);
// router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.use('/tasks',taskRoutes)
router.use('/users', userRoutes)
router.use('/task_progress', taskprogressRoutes)
router.use('/student', secB_studentRoutes)
router.use('/spells', secB_spellsRoutes)
router.use('/learn', secB_learntSpellRoutes)
router.use('/tournament', secB_tournamentRoutes)
router.use('/messages', ca2_messagesRoutes)

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;