import React from "react";

function SearchTLD() {
  return (
    <div>
      <input type="text" placeholder="Enter the tld (eg, .base, .xyz)" />
      <button>Search</button>
      <div className="search-results">
        <div className="result">
          <span>.xyz</span>
          <span className="status">Available</span>
          <button>Stake & Register</button>
        </div>
        <div className="result">
          <span>.base</span>
          <span className="status">Unavailable</span>
          <button>Stake & Register</button>
        </div>
      </div>
    </div>
  );
}

export default SearchTLD;
