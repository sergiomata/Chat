import React from 'react';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import {chatManager} from './services/Chatkit';
//import { chatManager, TokenProvider } from '@pusher/chatkit-client'
require('dotenv').config();

class App extends React.Component{

  constructor() {
    super()
    this.state = {
        roomId:null,
        messages: [],
        joinableRooms:[],
        joinedRooms:[]

    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  } 


  componentDidMount(){

    chatManager
    .connect()
      .then(currentUser => {
        this.currentUser = currentUser

        this.getRooms()
      })
      .catch(error => {
        console.error("error:", error);
      })
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        })
        .catch(err => {
          console.log(`Error getting joinable rooms: ${err}`)
        })
  }

  sendMessage(text){
    this.currentUser.sendSimpleMessage({
          text: text,
          roomId: this.state.roomId
    })  
  }

  createRoom(roomName){
    this.currentUser.createRoom({
      name:roomName
    }).then(room => this.subscribeToRoom(room.id))
    .catch(err => {
      console.log(`Error creating rooms: ${err}`)
    })
  }

  subscribeToRoom(roomId){
    this.setState({ messages:[] })
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages,message]
          })
        }
      }
    }).then(room =>{
      this.setState({
        roomId:room.id
      })
      this.getRooms()
    }).catch(err => {
      console.log(`Error getting joinable rooms: ${err}`)
    })
  }

  render (){
    return (
      <div className="app">
      <RoomList
      roomId ={this.state.roomId}
        subscribeToRoom={this.subscribeToRoom} 
        rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
      <MessageList 
        roomId ={this.state.roomId}
        messages={this.state.messages}/>
      <SendMessageForm 
        disabled={!this.state.roomId}
        sendMessage={this.sendMessage}/>
      <NewRoomForm createRoom={this.createRoom} />
      </div>
      );
  }
}

export default App;
