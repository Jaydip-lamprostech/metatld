import React from "react";
import DateComponent from "./DateComponent";

function TLDInformation(props) {
  return (
    <div className="info-section">
      <div className="info-column">
        <div className="info_title">Created Date</div>
        <DateComponent epochTime={props.tld.createdAt} />
      </div>
      <div className="info-column">
        <div className="info_title">Owner</div>
        <p className="tld_owner">
          {props.tld.owner
            ? props.tld.owner.slice(0, 6) +
              "..." +
              props.tld.owner.slice(
                props.tld.owner.length - 6,
                props.tld.owner.length
              )
            : "Connect Your Wallet"}
        </p>
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

export default TLDInformation;
