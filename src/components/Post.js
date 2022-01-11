import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { motion, Variants } from "framer-motion";
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
    <div className="post" onClick={() => props.onClick(data.items)}>
      {data.DataIsLoaded ? (
        <div className="postInfo">
          <div className="postDetails">
            <div className="postTitle">{data.items.data[0].title}</div>
            <div className="postMore">
              <div className="postLikes">likes</div>
              <div className="postDate">
                {data.items.data[0].date_created.slice(
                  0,
                  data.items.data[0].date_created.indexOf("T")
                )}
              </div>
            </div>
          </div>
          <img
            className="postImg"
            src={data.items.links[0].href}
            key={data.items.links[0].href}
          />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default Post;
