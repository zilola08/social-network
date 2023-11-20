// import useAxiosPrivate from "../hooks/useAxiosPrivate";

// export const addChat = async (sender,recipient) => {
//   // const axiosPrivate = useAxiosPrivate();
//   const response = await axiosPrivate.post('api/chats',{sender,recipient }); 
//   return response;
// }

// export const getMyChats = async(username) => {
//   const axiosPrivate = useAxiosPrivate();
//   const {data} = await axiosPrivate.get('api/chats/', {
//     params: { username: username }, 
//   }); 
//   return data;
// }

export const deleteChat = async(id) => {
  const axiosPrivate = useAxiosPrivate();
  const response = await axiosPrivate.delete('api/chats/', {
    params: { id: id }, 
  }); 
  return response;
}
