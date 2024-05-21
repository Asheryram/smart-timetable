const RoomAvailability = require("../models/RoomAvailability");

const getAllRoomAvailability = async (req, res) => {
	try {
		const data = await RoomAvailability.find()
			.populate({
				path: "roomId",
				populate: {
					path: "roomTypeId",
				},
			})
			.populate("periodId")
			.populate("dayId");

		const filtered = data.map((room) => {
			return {
                name : room.roomId.roomName,
                capacity : room.roomId.roomCapacity,
                available : room.isAvailable ,
                period:room.periodId.periodName ,
                day: room.dayId.dayName,
                classAssigned : "None"

            };
		});
		res.status(200).json(filtered);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllRoomAvailability,
};
