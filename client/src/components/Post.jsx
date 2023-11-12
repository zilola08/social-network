import React from "react";

const Post = (props) => {
  return (
    <div>
      <div className="post-item main">
        <p className="post-author">
          {props.personUsername} on <span>{props.date}</span> :
        </p>
        <p className="post-content">{props.content}</p>
      </div>
    </div>
  );
};

export default Post;
