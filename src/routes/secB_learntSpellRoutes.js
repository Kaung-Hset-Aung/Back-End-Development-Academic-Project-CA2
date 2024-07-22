// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/secB_learntSpellController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post ('/', controller.createNewLearner1,controller.createNewLearner2)
router.get ('/student_id/:student_id', controller.readSpellsByStudentId)

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
