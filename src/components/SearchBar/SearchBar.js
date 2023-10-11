import React, { useState } from 'react';
import { useSearch } from '../SearchContext/SearchContext'; // Import the useSearch hook from the context

// SearchBar component responsible for handling search input and API requests
export default function SearchBar() {
  const [inputText, setInputText] = useState('');
  const { updateResults } = useSearch(); // Access the updateResults function from the context

  // Handler function to update inputText state based on user input
  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText) {
      // Fetch data based on user input from the API
      fetch(`https://jsonplaceholder.typicode.com/${inputText}`)
        .then(response => response.json())
        .then(data => {
          updateResults(data); // Update results using the context function
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  // Render the search form with input and submit button
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search any song' value={inputText} onChange={inputHandler} />
        <input type='submit' value='Search' />
      </form>
    </>
  );
}
