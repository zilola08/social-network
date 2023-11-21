// import useAxiosPrivate from "../hooks/useAxiosPrivate";

// export const addMessage = async (senderUsername,receiverUsername,chatId, content) => {
//   // const axiosPrivate = useAxiosPrivate();
//   const response = await axiosPrivate.post('api/messages',{
//     senderUsername: senderUsername,
//     receiverUsername: receiverUsername,
//     chatId: chatId,
//     content: content
//   }); 
//   return response;
// }

// export const getMessagesInChat = async(id) => {
//   const axiosPrivate = useAxiosPrivate();
//   const {data} = await axiosPrivate.get('api/messages/', {
//     params: { chatId: id }, 
//   }); 
//   return data;
// }