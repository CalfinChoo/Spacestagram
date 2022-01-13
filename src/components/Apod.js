import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ReactLoading from "react-loading";
import "../css/Apod.css";

function Apod(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });

  useEffect(() => {
    updateData(props.data);
    console.log(props.data);
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
                  ></iframe>
                ) : (
                  <img
                    className="apodImg"
                    src={data.items.url}
                    onClick={() => {
                      props.onClick(data.items, true);
                      console.log(data);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="apodInfo">
              <h1 className="title">Astronomy Picture of the Day</h1>
              <h2 className="title">{data.items.title}</h2>
              <div className="explanation">{data.items.explanation}</div>
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
