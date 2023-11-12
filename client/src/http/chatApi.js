import { $host } from "./index";

export const addChat = async (sender,recipient) => {
  const response = await $host.post('api/chats',{sender,recipient }); 
  return response;
}

export const getMyChats = async(username) => {
  const {data} = await $host.get('api/chats/', {
    params: { username: username }, 
  }); 
  return data;
}

export const deleteChat = async(id) => {
  const response = await $host.delete('api/chats/', {
    params: { id: id }, 
  }); 
  return response;
}
