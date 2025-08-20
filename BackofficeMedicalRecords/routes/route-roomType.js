var express = require('express');
var router = express.Router();
var RoomType = require('../models/roomType'); // Assuming you have an RoomType model
const RoomTypeController = require('../controllers/controller-roomType'); 

/* GET roomTypes listing. */
router.get('/RoomTypes', RoomTypeController.getFilteredRoomTypes); // Uses the controller method to get roomTypes

/* POST create a new RoomType */
router.post('/createRoomType', RoomTypeController.createRoomType); // Uses the controller method to create roomTypes

module.exports = router;