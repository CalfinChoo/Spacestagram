import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../css/Post.css";

function Post(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });

  useEffect(() => {
    updateData({
      items: props.data,
      DataIsLoaded: true,
    });
  }, [props.data]);

  return (
    <div className="post">
      {data.DataIsLoaded ? (
        <div className="postInfo">
          <img className="postImg" src={data.items.links[0].href} />
          {/* <div>
            <h2 className="title">{data.items.data[0].title}</h2>
          </div> */}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default Post;
