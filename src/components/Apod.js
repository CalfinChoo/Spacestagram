import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ReactLoading from "react-loading";
import Heart from "react-heart";
import { reactLocalStorage } from "reactjs-localstorage";

import "../css/Apod.css";

function Apod(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });
  const [liked, updateLiked] = useState(false);

  const handleUpdateLiked = (isLiked) => {
    let ls = [...JSON.parse(reactLocalStorage.get("liked", "[]"))];
    isLiked
      ? reactLocalStorage.set(
          "liked",
          JSON.stringify(
            ls.filter((val) => {
              return val !== data.items.date;
            })
          )
        )
      : reactLocalStorage.set(
          "liked",
          JSON.stringify(ls.concat([data.items.date]))
        );
    updateLiked((prev) => !prev);
  };

  useEffect(() => {
    updateData(props.data);
    updateLiked(
      JSON.parse(reactLocalStorage.get("liked", "[]")).includes(
        props.data.items.date
      )
    );
  }, [props.data]);

  return (
    <div className="apodArea">
      <div className="apod">
        {data.DataIsLoaded ? (
          <div className="apodContainer">
            <div className="apodMediaContainer">
              <div className="media">
                {data.items.media_type === "video" ? (
                  <iframe
                    width="100%"
                    height="auto"
                    src={data.items.url}
                    title={data.items.url}
                  ></iframe>
                ) : (
                  <img
                    className="apodImg"
                    src={data.items.url}
                    onClick={() => {
                      props.onClick(data.items, liked, updateLiked, true);
                    }}
                    alt="Error Displaying"
                  />
                )}
              </div>
            </div>
            <div className="apodInfo">
              <div className="apodHeader">
                <h1 className="title">Astronomy Picture of the Day</h1>
                <div className="apodHeartContainer">
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
              <span className="date">{data.items.date}</span>
              <h2 className="title">{data.items.title}</h2>
              <span className="explanation">{data.items.explanation}</span>
            </div>
          </div>
        ) : (
          <ReactLoading className="apodLoader" type="bubbles" color="white" />
        )}
      </div>
    </div>
  );
}

export default Apod;
