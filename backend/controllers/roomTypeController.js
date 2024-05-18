const RoomType = require('../models/RoomType');

const createRoomType = async (req, res) => {
    try {
        const roomType = new RoomType(req.body);
        await roomType.save();
        res.status(201).json(roomType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find({});
        res.status(200).json(roomTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRoomType,
    getAllRoomTypes
};
