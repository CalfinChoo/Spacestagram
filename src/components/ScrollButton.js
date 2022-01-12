import React, { useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import "../css/ScrollButton.css";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button>
      <ArrowCircleUpIcon
        className="scrollButton"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </button>
  );
}

export default ScrollButton;
