const RoomType = require('../models/RoomType');
const Room = require('../models/Room');

const createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).populate('roomType');
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms
};
