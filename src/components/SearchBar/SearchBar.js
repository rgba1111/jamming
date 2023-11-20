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

  function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
    } while (elem === elem.offsetParent);
    return offsetTop;
  }
  
  window.addEventListener('scroll', function() {
    var element = document.querySelector('.stickySearch');
    
    var stopElement_idle = document.querySelector('.stopElement_idle');

    var stopElement_active = document.querySelector('.searchResultsWrap');

    if (stopElement_idle) {
      var stopPoint_idle = getOffsetTop(stopElement_idle); 
  
      if (window.scrollY > stopPoint_idle) {
        element.style.top = (-100) + 'px';
      } else {
        element.style.position = 'sticky';
        element.style.top = 0;
      }
    }
    if (stopElement_active) {
      var stopPoint = getOffsetTop(stopElement_active) + 180; 
  
      if (window.scrollY > stopPoint) {
        element.style.top = (-100) + 'px';
      } else {
        element.style.position = 'sticky';
        element.style.top = 0;
      }
    }
  });



  return (
    <>
      <div className="Label">
        <div className="staticIcon" id="searchIcon"></div>
        <h2>Find songs</h2>
      </div>
      <form className="stickySearch" onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            className="SearchBar"
            placeholder="Enter a Song, Album, or Artist"
            type="text"
            value={term}
            ref={inputRef}
            onChange={handleChange}
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