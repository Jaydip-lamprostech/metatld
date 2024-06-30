import React, { useState } from "react";
import "../styles/domaincomponent.css";
import { ethers } from "ethers"; // Import ethers library
import { Link } from "react-router-dom";

function SearchDomain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    if (searchTerm === "") {
      setErrorMessage("Please enter domain name");
      return;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api-metatlds.vercel.app/check-availability/${searchTerm}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        // Map over the data to format the price to ETH
        const formattedResults = data.map((domain) => ({
          ...domain,
          priceInEth: domain.available
            ? parseFloat(ethers.utils.formatEther(domain.price)).toFixed(4) +
              " ETH"
            : "Not Available",
        }));
        console.log("formattedResults", formattedResults);
        setSearchResults(formattedResults);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error checking domain availability");
        setSearchResults([]);
      });
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
        {searchResults.map((domain, index) => (
          <div key={index} className="domain-item">
            <div className="left">
              <div className="domain-name">{domain.name}</div>
              <div
                className={`status ${
                  domain.available ? "available" : "unavailable"
                }`}
              >
                {domain.available ? "Available" : "Unavailable"}
              </div>
            </div>

            <div className="right">
              <span
                className={`price ${
                  domain.priceInEth === "Not Available" ? "disabled" : null
                }`}
              >
                {domain.priceInEth}
              </span>
              <Link
                className={`buy-button ${!domain.available && "disabled"}`}
                disabled={!domain.available}
                to={`/register/domain?tldName=${domain.tld}&query=${searchTerm}&tldIdentifier=${domain.identifier}&domainPrice=${domain.price}`}
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDomain;
