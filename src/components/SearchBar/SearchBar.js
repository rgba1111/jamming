import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const { onSearch} = props;
  const [term, setTerm] = useState(""); // State to store the search term


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Call the onSearch function with the search term
    onSearch(term);
  };

  return (
    <>
      <div className="Label">
        <div className="staticIcon" id="searchIcon"></div>
        <h2>Find songs</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="SearchBar"
          placeholder="Enter a Song, Album, or Artist"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)} // Update the search term state
        />
        {term.length > 0 ? (
        <div>
           <button className="cta" type="submit">Search Songs</button>
        </div>
      ) : (
        <button disabled className="cta" type="submit">Search Songs</button>
      )}
      </form>
    </>
  );
}