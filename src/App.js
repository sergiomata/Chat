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
        messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  } 


  componentDidMount(){

    chatManager
    .connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoomMultipart({
          roomId: this.currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages,message]
              })
            }
          }
        });
      })
      .catch(error => {
        console.error("error:", error);
      })
  }

  sendMessage(text){
    this.currentUser.sendSimpleMessage({
          text: text,
          roomId: this.currentUser.rooms[0].id
    })  
  }

  render (){
    return (
      <div className="app">
      <RoomList />
      <MessageList messages={this.state.messages}/>
      <SendMessageForm sendMessage={this.sendMessage}/>
      <NewRoomForm />
      </div>
      );
  }
}

export default App;
