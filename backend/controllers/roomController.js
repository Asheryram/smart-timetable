const Room = require('../models/Room');

const getAllRooms = async (req, res) => {
    try {
        const data = await Room.find().populate('roomTypeId','roomTypeName')

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRooms
};
