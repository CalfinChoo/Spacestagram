import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../css/Apod.css";

function Apod(props) {
  const [data, updateData] = useState({
    items: [],
    DataIsLoaded: false,
  });

  useEffect(() => {
    updateData(props.data);
  }, [props.data]);

  return (
    <div className="apod">
      {data.DataIsLoaded ? (
        <div className="apodInfo">
          <img className="apodImg" src={data.items.url} />
          <div>
            <h1 className="title">Astronomy Picture of the Day: </h1>
            <h2 className="title">{data.items.title}</h2>
            <div className="explanation">{data.items.explanation}</div>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default Apod;
