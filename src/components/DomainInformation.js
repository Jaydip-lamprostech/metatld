import React, { useEffect, useState } from "react";
import DateComponent from "./DateComponent";
import "../styles/DomainInformation.css";
// import baseContractABI from "../artifacts/contracts/Base.json";
import { ethers } from "ethers";

function DomainInformation(props) {
  const [expiryDate, setExpiryDate] = useState();

  return (
    <div className="info-section">
      <div className="info-column">
        <div className="info_title">Created Date</div>
        <DateComponent epochTime={props.domainDetails.blockTimestamp} />
      </div>
      <div className="info-column">
        <div className="info_title">Registered Date</div>
        <DateComponent epochTime={props.domainDetails.blockTimestamp} />
      </div>
      <div className="info-column">
        <div className="info_title">Expiry Date</div>
        <DateComponent epochTime={props.domainDetails.expires} />
      </div>
      {/* <div className="info-column">
        <div className="info_title">Length</div>
        <div className="info_value_main">coming soon</div>
      </div>

      <div className="info-column">
        <div className="info_title">Segment Length</div>
        <div className="info_value_main">coming soon</div>
      </div>
      <div className="info-column">
        <div className="info_title">Character Set</div>
        <div className="info_value_main">coming soon</div>
      </div> */}
    </div>
  );
}

export default DomainInformation;
