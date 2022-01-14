import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import "../css/ScrollButton.css";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.querySelector(".body").scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    document.querySelector(".body").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.querySelector(".body").addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <ArrowCircleUpIcon
      className="scrollButton"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    />
  );
}

export default ScrollButton;
