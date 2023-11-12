import { $host } from "./index";

export const addMessage = async (senderUsername,receiverUsername,chatId, content) => {
  const response = await $host.post('api/messages',{
      senderUsername: senderUsername,
      receiverUsername: receiverUsername,
      chatId: chatId,
      content: content
  }); 
  return response;
}

export const getMessagesInChat = async(id) => {
  const {data} = await $host.get('api/messages/', {
    params: { chatId: id }, 
  }); 
  return data;
}