import React from "react";

const MyPost = (props) => {
  return (
      <div className="post-item my-post">
        <p className="post-author">
          {props.personUsername} on <span>{props.date}</span> :
        </p>
        <p className="post-content">{props.content}</p>
      </div>
  );
};

export default MyPost;
