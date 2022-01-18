import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Heart from "react-heart";
import { reactLocalStorage } from "reactjs-localstorage";
import "../css/Post.css";

function Post(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });
  const [loaded, updateLoaded] = useState(false);
  const [liked, updateLiked] = useState(false);

  const handleUpdateLikedProp = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleUpdateLiked = (isLiked) => {
    let ls = [...JSON.parse(reactLocalStorage.get("liked", "[]"))];
    isLiked
      ? reactLocalStorage.set(
          "liked",
          JSON.stringify(
            ls.filter((val) => {
              return val !== data.items.data[0].nasa_id;
            })
          )
        )
      : reactLocalStorage.set(
          "liked",
          JSON.stringify(ls.concat([data.items.data[0].nasa_id]))
        );
    updateLiked((prev) => !prev);
  };

  useEffect(() => {
    // reactLocalStorage.clear();
    updateData({
      items: props.data,
      DataIsLoaded: true,
    });
    updateLiked(
      JSON.parse(reactLocalStorage.get("liked", "[]")).includes(
        props.data.data[0].nasa_id
      )
    );
  }, [props.data]);

  return (
    <div
      className="post"
      onClick={() => props.onClick(data.items, liked, handleUpdateLiked, false)}
    >
      {data.DataIsLoaded && (
        <div className="postInfo">
          <div className="postDetails">
            <div className="postTitle">{data.items.data[0].title}</div>
            <div className="postMore">
              <div
                className="postLikes"
                onClick={(e) => handleUpdateLikedProp(e)}
              >
                <div className="heartContainer" title="Like">
                  <Heart
                    className="heart"
                    isActive={liked}
                    onClick={() => handleUpdateLiked(liked)}
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
            alt="Error Displaying"
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
