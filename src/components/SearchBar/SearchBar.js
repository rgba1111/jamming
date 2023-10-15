import React, { useState } from "react";

export default function SearchBar(props) {
  const { onSearch } = props;
  const [term, setTerm] = useState(""); // State to store the search term

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Call the onSearch function with the search term
    onSearch(term);
  };

  return (
    <>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          className="SearchBar"
          placeholder="Enter A Song, Album, or Artist"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)} // Update the search term state
        />
        <button className="SearchButton" type="submit">
          Search
        </button>
      </form>
      <br></br>
    </>
  );
}