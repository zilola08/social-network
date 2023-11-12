import { $host } from "./index";
export const getAllPosts = async () => {
  const { data } = await $host.get('api/posts'); 
  return data;
}

export const addPost = async (content, personUsername) => {
  const response = await $host.post('api/posts', {content, personUsername}); 
  return response;
}

export const getMyPosts = async(username) => {
  const { data } = await $host.get('api/posts/myposts', {
    params: { username: username }, 
  }); 
  return data;
}

export const deletePost = async(postId) => {
  const response = await $host.delete('api/posts', {
    params: { id: postId }, 
  }); 
  return response;
}
