// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/ca2_messagesController');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/:id', controller.createNewMessage);
router.get('/',controller.readAllGMessages);
router.delete ('/:id', controller.deleteMessagesById);
router.put ('/:id', controller.updateMessageById);
router.get ('/:id', controller.readMessageById);


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
