import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
require('dotenv').config();

console.log(process.env.CHATKIT_URL);
const tokenProvider = new TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/30ed534a-ddb7-46d4-b595-b0a0765a7400/token'
  });
  
  
export const chatManager = new ChatManager({
    instanceLocator: 'v1:us1:30ed534a-ddb7-46d4-b595-b0a0765a7400',
    userId:'1234',
    tokenProvider: tokenProvider
  });
