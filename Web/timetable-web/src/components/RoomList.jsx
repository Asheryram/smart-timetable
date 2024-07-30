import React from 'react';

function RoomList() {
    const rooms = [];

    return (
        <div>
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.name}>{room.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;
