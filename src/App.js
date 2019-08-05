import React from 'react';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
require('dotenv').config();

console.log(process.env.CHATKIT_URL);

class App extends React.Component{

  constructor() {
    super()
    this.state = {
        messages: []
    }
  } 


  componentDidMount(){

    const tokenProvider = new TokenProvider({
      url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/30ed534a-ddb7-46d4-b595-b0a0765a7400/token'
    });
    
    
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:30ed534a-ddb7-46d4-b595-b0a0765a7400',
      userId:'1234',
      tokenProvider: tokenProvider
    });
  
    chatManager.connect()
    .then(currentUser => {
      console.log('Successful connection', currentUser)
    })
    .catch(err => {
      console.log('Error on connection', err)
    })
    /*
    .then(currentUser => {
      currentUser.subscribeToRoom({
          roomId: '31266350',
          hooks: {
              onNewMessage: message => {
                  console.log('message.text: ', message.text);
                  this.setState({
                    messages: [...this.state.messages,message]
                  })
              }
          }
      })
    
    })
    */
  }
  render (){
    console.log('this.state.messages',this.state.messages);
    return (
      <div className="app">
      <RoomList />
      <MessageList />
      <SendMessageForm />
      <NewRoomForm />
      </div>
      );
  }
}

export default App;
