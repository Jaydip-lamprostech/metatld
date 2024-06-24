import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DomainSearch from "../components/SearchDomain";
import TLDSearch from "../components/SearchTLD";
import "../styles/search.css";

function SearchDomainOrTLD() {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("type");
  const [activeComponent, setActiveComponent] = useState(
    searchType ? searchType : "tld"
  );

  return (
    <div className="mainSearchPage">
      <div className="navigation">
        <button
          className={`tldbutton ${activeComponent === "tld" ? "active" : ""}`}
          onClick={() => setActiveComponent("tld")}
        >
          Search TLD
        </button>
        <div className="line"></div>
        <button
          className={`domainbutton ${
            activeComponent === "domain" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("domain")}
        >
          Search Domain
        </button>{" "}
      </div>
      {activeComponent === "domain" ? <DomainSearch /> : <TLDSearch />}
    </div>
  );
}

export default SearchDomainOrTLD;
