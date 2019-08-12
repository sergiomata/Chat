import React from 'react';

class RoomList extends  React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Your rooms:</h3>
                    {orderedRooms.map( room => {
                        return(
                            <li key={room.id} className="room">
                                <a 
                                    onClick={() => this.props.subscribeToRoom(room.id)} 
                                    href="#">#{room.name}
                                    </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default RoomList;
