import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Container } from "react-bootstrap";
import { Context } from "../main";
// import { deletePost, getMyPosts } from "../http/postApi";
import MyPost from "../components/MyPost";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useContext(Context);
  const axiosPrivate = useAxiosPrivate();

  const getMyPosts = async (username) => {
    const { data } = await axiosPrivate.get("api/posts/myposts", {
      params: { username: username },
    });
    return data;
  };

  const deletePost = async (postId, username) => {
    const response = await axiosPrivate.delete("api/posts", {
      params: { id: postId, personUsername: username },
    });
    return response;
  };

  const loadMyPosts = async () => {
    try {
      let data;
      data = await getMyPosts(user.user.username);
      data = data.sort(function (a, b) {
        return b.id - a.id;
      });
      setMyPosts(data);
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        console.log(e);
      }
    }
  };

  const deleteMyPost = async (postId, username) => {
    try {
      await deletePost(postId, username);
      loadMyPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    loadMyPosts();
  }, []);

  return (
    <Container>
      <h5 className="post-list-title">My posts</h5>
      {myPosts.map(function (post) {
        const date = post.createdAt.substr(0, 10);
        return (
          <div key={post.id} className="post-block">
            <MyPost
              date={date}
              personUsername={post.personUsername}
              content={post.content}
            ></MyPost>
            <Button
              className="post-item__delete-button"
              onClick={() => deleteMyPost(post.id, post.personUsername)}
            >
              x
            </Button>
          </div>
        );
      })}
    </Container>
  );
};

export default observer(Profile);
