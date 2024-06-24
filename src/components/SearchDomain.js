import React, { useState } from "react";
import "../styles/domaincomponent.css";

function SearchDomain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const domains = [
    { suffix: "mode", status: "Unavailable", price: 100, available: false },
    { suffix: "abcd", status: "Available", price: 100, available: true },
    { suffix: "marvel", status: "Available", price: 100, available: true },
    { suffix: "base", status: "Available", price: 100, available: true },
  ];

  const handleSearch = () => {
    if (searchTerm === "") {
      setErrorMessage("Please enter domain name");
      return;
    }
    setSubmittedTerm(searchTerm);
    setSearchTerm("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="domaincomponent">
      <div className="domain-search-container">
        <input
          type="text"
          placeholder="Search for domain name (eg, spiderman)"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#111"
              d="M15.7 14.3h-.79l-.28-.27a6.5 6.5 0 1 0-.91.91l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6.2 0A4.8 4.8 0 1 1 14.3 9.5a4.8 4.8 0 0 1-4.8 4.8z"
            />
          </svg>
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="heading">Search Results</div>
      <div className="domain-result">
        {" "}
        {submittedTerm &&
          domains.map((domain, index) => (
            <div key={index} className="domain-item">
              <div className="left">
                <div className="domain-name">
                  {submittedTerm}.{domain.suffix}
                </div>
                <div
                  className={`status ${
                    domain.available ? "available" : "unavailable"
                  }`}
                >
                  {domain.status}
                </div>
              </div>

              <div className="right">
                <span className="price">${domain.price}</span>
                <button className="buy-button" disabled={!domain.available}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchDomain;
