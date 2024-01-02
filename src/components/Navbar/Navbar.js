import React, { useState } from "react";
import "./Navbar.css";
const Navbar = ({ handleSearchSubmit }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(searchInput);
    setSearchInput("");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-head">
          weatherto
        </a>
      </div>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City....."
            className="search-input"
            value={searchInput}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
