// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/taskprogressController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.checkUserAndTaskId,controller.createNewTask)
router.get ('/:id', controller.readTaskProgressById)
router.put ('/:id', controller.updateTaskProgressById)
router.delete ('/:id', controller.deleteTaskById)
router.get ('/users/:user_id', controller.readTPbyUserId)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
