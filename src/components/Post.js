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
    <motion.div className="post">
      {data.DataIsLoaded ? (
        <motion.div
          className="postInfo"
          whileHover={{ scale: 1.1, border: "1px solid green" }}
        >
          <img className="postImg" src={data.items.links[0].href} />
          {/* <div>
            <h2 className="title">{data.items.data[0].title}</h2>
          </div> */}
        </motion.div>
      ) : (
        <span>Loading...</span>
      )}
    </motion.div>
  );
}

export default Post;
