import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "../services/axios";

const RoomAvailability = () => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const fetchRoomAvailability = async () => {
			try {
				const res= await axios.get("/roomAvailability");
        console.log(res)
        if(res.data){
          setRooms(res?.data);

        }
			} catch (error) {
				console.error("Error fetching room availability:", error);
				setRooms([]);
			}
		};

    fetchRoomAvailability()
	}, []);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Room Availability
			</Typography>
			<Grid container spacing={3}>
				{rooms?.map((room) => (
					<Grid item xs={12} sm={6} md={4} key={room.id}>
						<Card>
							<CardContent>
								<Typography variant="h6">{room.name}  </Typography>
								<Typography color={room.available ? "green" : "red"}>
									{room.available ? "Available" : "Occupied"}
								</Typography>
								<Typography color={room.available ? "green" : "red"}>
                 Period  {room.period}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default RoomAvailability;
