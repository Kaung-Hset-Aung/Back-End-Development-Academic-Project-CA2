// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/secB_studentController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post ('/', controller.readStudentByUserId, controller.readUserbyIdWithPoints, controller.createNewStudent)
router.get ('/', controller.readAllStudents)
router.get ('/house/:housename', controller.readStudentByHouse)
router.get ('/alumni', controller.readAllAlumni)
router.get ('/alumni/goat', controller.readGOAT)
router.get ('/:student_id', controller.readStudentById)
router.post('/graduate/:student_id', controller.check_student, controller.getEcoPointsAndDamage, controller.graduation )

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
