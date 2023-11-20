// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { host } from "../http/index";

// export const getAllPosts = async () => {
//   // const axiosPrivate = useAxiosPrivate();
//   const { data } = await axiosPrivate.get('api/posts'); 
//   return data;
// }

// export const addPost = async (content, personUsername) => {
//   // const axiosPrivate = useAxiosPrivate();
//   const response = await axiosPrivate.post('api/posts', {content, personUsername}); 
//   return response;
// }

// export const getMyPosts = async(username) => {
//   // const axiosPrivate = useAxiosPrivate();
//   const { data } = await axiosPrivate.get('api/posts/myposts', {
//     params: { username: username }, 
//   }); 
//   return data;
// }

// export const deletePost = async(postId, username) => {
//   // const axiosPrivate = useAxiosPrivate();
//   const response = await axiosPrivate.delete('api/posts', {
//     params: { id: postId , personUsername: username}, 
//   }); 
//   return response;
// }
