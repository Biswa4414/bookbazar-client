import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.post("http://localhost:8000/books/search");
      setSearchResult(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="text" required placeholder="Enter your Book name" />
      <button onClick={handleSearch}>Search</button>
      {searchResult && (
        <div>
          <h2>Search Result:</h2>
          <p>Title: {searchResult.title}</p>
          <p>Author: {searchResult.author}</p>
          {/* Add other book details you want to display */}
        </div>
      )}
    </div>
  );
};

export default Search;
