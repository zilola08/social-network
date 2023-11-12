import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import Post from "../components/Post";
import { addPost, getAllPosts } from "../http/postApi";
import { Context } from "../main";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useContext(Context);

  const loadPosts = async () => {
    try {
      let data;
      data = await getAllPosts();
      data = data.sort(function (a, b) {
        return b.id - a.id;
      });
      setPosts(data);
    } catch (e) {
      if (e.response.data.message) {
        alert(e.response.data.message);
      } else {
        console.log(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log(user.user, content);
    e.preventDefault();
    if (user.user.username && content) {
      try {
        const response = await addPost(content, user.user.username);
        console.log(response);
        loadPosts();
        setContent("");
        return response;
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  },[]);
  
 return (
    <Container>
      <div className="post-input-box">
        <input
          type="text"
          className="form-control post-input"
          placeholder=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-dark button-post" onClick={handleSubmit}>
          post
        </button>
      </div>
      <h5 className="post-list-title">Recent posts</h5>
      <div className="list post-list">
        {posts.map(function (post) {
          const date = post.createdAt.substr(0, 10);
          // const time = post.createdAt.substr(11, 5)+"UTC";
          return (
            <Post
              key={post.id}
              date={date}
              personUsername={post.personUsername}
              content={post.content}
            ></Post>
          );
        })}
      </div>
    </Container>
  );
};

export default Main;
