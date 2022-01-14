import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  const [search, updateSearch] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  const handleRootNavigate = () => {
    if (location.pathname === "/") window.location.reload(false);
  };

  useEffect(() => {
    location.pathname.includes("/search/")
      ? updateSearch(decodeURI(location.pathname.slice(8)))
      : updateSearch("");
  }, [location.pathname]);

  const handleSearchNavigate = () => {
    if (/\S/.test(search)) {
      navigate(`/search/${search}`);
      window.location.reload(false);
    }
  };

  const handleSubmit = (e) => {
    if (e.code === "Enter") {
      handleSearchNavigate();
    }
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="logoContainer">
          <Link to="/" className="logo" onClick={handleRootNavigate}>
            Spacestagram
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
          <SearchIcon className="searchIcon" onClick={handleSearchNavigate} />
        </div>
      </div>
    </div>
  );
}

export default Header;
