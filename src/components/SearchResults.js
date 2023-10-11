import React, { useState } from 'react';
import { useSearch } from './SearchContext'; // Import the useSearch hook from the context

// SearchResults component responsible for displaying search results
export default function SearchResults() {
    const { results, addTrack } = useSearch();
    return (
        <>
            <h2>Search results</h2>
            <ol>
                {results.slice(0, 5).map((result, index) => {
                    return (
                        <li key={index}>
                            {JSON.stringify(result)}
                            <button onClick={() => addTrack(result)}>Add</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}