import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ReactLoading from "react-loading";
import Heart from "react-heart";
import "../css/Post.css";

function Post(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });
  const [loaded, updateLoaded] = useState(false);
  const [liked, updateLiked] = useState(false);

  const handleUpdateLiked = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    updateData({
      items: props.data,
      DataIsLoaded: true,
    });
  }, [props.data]);

  return (
    <div
      className="post"
      onClick={() => props.onClick(data.items, liked, updateLiked, false)}
    >
      {data.DataIsLoaded && (
        <div className="postInfo">
          <div className="postDetails">
            <div className="postTitle">{data.items.data[0].title}</div>
            <div className="postMore">
              <div className="postLikes" onClick={(e) => handleUpdateLiked(e)}>
                <div className="heartContainer" title="Like">
                  <Heart
                    className="heart"
                    isActive={liked}
                    onClick={() => updateLiked((prev) => !prev)}
                    inactiveColor="white"
                    animationTrigger="both"
                    animationScale={1.2}
                    animationDuration={0.25}
                  />
                </div>
              </div>
              <div className="postDate">
                <span>
                  {data.items.data[0].date_created.slice(
                    0,
                    data.items.data[0].date_created.indexOf("T")
                  )}
                </span>
              </div>
            </div>
          </div>
          <img
            className="postImg"
            style={loaded ? {} : { display: "none" }}
            src={data.items.links[0].href}
            key={data.items.links[0].href}
            onLoad={() => {
              updateLoaded(true);
            }}
          />
          {!loaded && (
            <ReactLoading className="postLoader" type="bubbles" color="white" />
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
