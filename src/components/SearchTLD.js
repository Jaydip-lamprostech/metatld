import React, { useState } from "react";
import "../styles/tldcomponent.css";
import { Link } from "react-router-dom";

function SearchTLD() {
  const [tld, setTld] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [searchedTld, setSearchedTld] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    if (tld === "") {
      setErrorMessage("Please enter a TLD");
      return;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api-metatlds.vercel.app/check-available-tld/${tld}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        if (data.available !== undefined) {
          setIsAvailable(data.available);
          setSearchedTld(tld);
          setTld("");
          setErrorMessage("");
        } else {
          throw new Error("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error checking TLD availability");
        setIsAvailable(false);
      });
  };

  const handleChange = (e) => {
    setTld(e.target.value);
    setIsAvailable(null);
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="tldcomponent">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter the tld (eg, -base, -xyz)"
          value={tld}
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

      {isAvailable !== null && (
        <div className={`result ${isAvailable ? "available" : "unavailable"}`}>
          <div className="tldname">{searchedTld}</div>
          <div className="availability">
            <div>{isAvailable ? "Available" : "Unavailable"}</div>
            <Link
              to={`/register/tld?tldName=${searchedTld}`}
              className={!isAvailable ? "disabled" : null}
            >
              Stake and Deploy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchTLD;
