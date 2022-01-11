import React from "react";
import Post from "./Post";
import "../css/Home.css";

function Posts(props) {
  return (
    <div className="posts">
      <div className="postsContainer">
        {props.posts.items.map((post, i) => {
          return <Post data={post} onClick={props.openModal} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
