// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/secB_tournamentController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/registration/:student_id', controller.applyForTournament, controller.getEcoPoints, controller.createNewregistration)
router.delete ('/registration/:registration_id', controller.deleteRegistrationById)
router.get ('/registration', controller.readAllRegistrations)
router.get ('/registration/:registration_id', controller.readByRegistrationId)
router.post('/p1/:student_id1/p2/:student_id2', controller.checkRegister, controller.tournamentrecord)
router.get ('/records', controller.readAllrecords)



// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
