import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../css/Post.css";

function Post(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });

  useEffect(() => {
    updateData(props.data);
  }, [props.data]);

  return (
    <div className="post">
      {data.DataIsLoaded ? (
        <div className="postInfo">
          <img src={data.items.url} />
          <h1 className="title">{data.items.title}</h1>
          <div className="explanation">{data.items.explanation}</div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default Post;
