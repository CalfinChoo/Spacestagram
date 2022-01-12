import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  const [search, updateSearch] = useState("");
  let navigate = useNavigate();

  const handleNavigate = () => {
    if (/\S/.test(search)) navigate(`/search/${search}`);
  };

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      handleNavigate();
    }
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="logoContainer">
          <Link to="/" className="logo">
            Spacetagram
          </Link>
        </div>
        <div className="inputContainer">
          <input
            className="searchInput"
            placeholder="Search NASA"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            onKeyDown={handleSubmit}
            // onSubmit={(event) => navigate(`/search/${event.target}`)}
          />
          <SearchIcon className="searchIcon" onClick={handleNavigate} />
        </div>
      </div>
    </div>
  );
}

export default Header;
