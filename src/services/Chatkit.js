require('dotenv').config();

const tokenProvider = new Chatkit.TokenProvider({
    url: process.env.CHATKIT_URL,
  });
  
  
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    userId:process.env.CHATKIT_USERID,
    tokenProvider: tokenProvider
  });
  