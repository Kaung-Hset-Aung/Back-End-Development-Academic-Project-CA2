// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/taskController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post ('/', controller.createNewTask, controller.readTaskbyId201)
router.get ('/', controller.readAllTasks)
router.get ('/:id', controller.readTaskById)
router.put ('/:id', controller.updateTaskById)
router.delete ('/:id', controller.deleteTaskById)

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;

