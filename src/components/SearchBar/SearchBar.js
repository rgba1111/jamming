import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const { onSearch, inputRef, onClearSearch, setPlaceholder} = props;
  const [term, setTerm] = useState(""); 

  const clearSearch = () => {
    onClearSearch();
    setTerm("");
    setPlaceholder("Search for anything");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(term);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
    e.preventDefault();
    onSearch(term);
  }


  return (
    <>
      <div className="Label">
        <div className="staticIcon" id="searchIcon"></div>
        <h2>Find songs</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            className="SearchBar"
            placeholder="Enter a Song, Album, or Artist"
            type="text"
            value={term}
            ref={inputRef}
            onChange={handleChange}
            // onChange={(e) => setTerm(e.target.value)}
          />
          {term.length > 0 ? (
            <button className="resetButton" onClick={clearSearch} type="reset">
              <div className="activeIcon" id="crossIcon"></div>
            </button>
          ):(<div></div>)}
        </div>

        {/* button to manually submit search */}

        {/* {term.length > 0 ? (
          <button className="cta" type="submit">Search Songs</button>
        ) : (

          <button disabled className="cta" type="submit">Search Songs</button>
        )} */}
      </form>
    </>
  );
}