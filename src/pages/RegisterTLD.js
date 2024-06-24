import React, { useState } from "react";
import "../styles/RegisterTLD.css";
import { useSearchParams } from "react-router-dom";

function RegisterTLD() {
  const [searchParams] = useSearchParams();
  const tldName = searchParams.get("tldName");
  console.log(tldName);
  const [showTLDName, setTLDName] = useState(
    tldName ? tldName.toLowerCase() : ""
  );
  const [letterConfigurations, setLetterConfigurations] = useState([
    { letter: "", price: "" },
  ]);

  const addLetterConfiguration = () => {
    setLetterConfigurations([
      ...letterConfigurations,
      { letter: "", price: "" },
    ]);
  };

  const handleInputChange = (index, event) => {
    const values = [...letterConfigurations];
    values[index][event.target.name] = event.target.value;
    setLetterConfigurations(values);
  };

  const removeLetterConfiguration = (index) => {
    const values = [...letterConfigurations];
    values.splice(index, 1);
    setLetterConfigurations(values);
  };

  return (
    <div className="container">
      <h1 className="regtld-h1">Create Your Own TLD</h1>
      <form className="regtld-form">
        <div className="input-group mb-40">
          <label>TLD Name</label>
          <div className="regtld-input-parent">
            <input
              type="text"
              placeholder="spiderman.base"
              className="regtld-input"
              value={showTLDName ? "." + showTLDName : null}
              readOnly
            />
          </div>
        </div>

        <div className="regtld-config-heading">
          <span>Configuration</span>
        </div>
        <div className="input-group-flex">
          <div className="input-group ">
            <label>Min Domain Length</label>
            <div className="regtld-input-parent">
              <input
                type="number"
                placeholder="Enter Minimum Domain Length"
                className="regtld-input"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="regtld-label">Max Domain Length</label>
            <div className="regtld-input-parent">
              <input
                type="number"
                placeholder="Enter Maximum Domain Length"
                className="regtld-input"
              />
            </div>
          </div>
        </div>
        <div className="input-group-flex">
          <div className="input-group">
            <label className="regtld-label">Min Registration Duration</label>
            <div className="regtld-input-parent">
              <input
                type="text"
                placeholder="1 year"
                className="regtld-input"
              />
            </div>
          </div>
          <div className="input-group">
            <label className="regtld-label">Min Renew Duration</label>
            <div className="regtld-input-parent">
              <input
                type="text"
                placeholder="e.g., 10 days"
                className="regtld-input"
              />
            </div>
          </div>
        </div>
        <div className="input-group">
          <label className="regtld-label">Mint Cap</label>
          <div className="regtld-input-parent">
            <input
              type="number"
              placeholder="e.g., 10,000"
              className="regtld-input"
            />
          </div>
        </div>
        <div className="regtld-config-heading">
          <span>Letter & Price Configuration</span>
        </div>
        <div className="letter-price-config-parent">
          {letterConfigurations.map((config, index) => (
            <div key={index} className="letter-config-group">
              <div className="input-group">
                <label className="regtld-label">Letter Configuration</label>
                <div className="regtld-input-parent">
                  <input
                    type="text"
                    name="letter"
                    placeholder="e.g., 3"
                    value={config.letter}
                    onChange={(event) => handleInputChange(index, event)}
                    className="regtld-input"
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="regtld-label">Price</label>
                <div className="regtld-input-parent">
                  <input
                    type="text"
                    name="price"
                    placeholder="e.g., 10 USD"
                    value={config.price}
                    onChange={(event) => handleInputChange(index, event)}
                    className="regtld-input"
                  />
                </div>
              </div>
              {letterConfigurations.length > 1 && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => removeLetterConfiguration(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <div className="add-button-parent">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={addLetterConfiguration}
            >
              <mask
                id="mask0_153_223"
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="39"
                height="39"
              >
                <path
                  d="M20.3804 37.3625C29.7601 37.3625 37.3634 29.7593 37.3634 20.3796C37.3634 10.9999 29.7601 3.39661 20.3804 3.39661C11.0007 3.39661 3.39746 10.9999 3.39746 20.3796C3.39746 29.7593 11.0007 37.3625 20.3804 37.3625Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="3.39659"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.3801 13.5864V27.1728M13.5869 20.3796H27.1733"
                  stroke="black"
                  strokeWidth="3.39659"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
              <g mask="url(#mask0_153_223)">
                <path
                  d="M0 1.52588e-05H40.7591V40.7591H0V1.52588e-05Z"
                  fill="url(#paint0_linear_153_223)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_153_223"
                  x1="20.3796"
                  y1="1.52588e-05"
                  x2="20.3796"
                  y2="40.7591"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#72EEFF" />
                  <stop offset="1" stopColor="#B4E9FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="stake-register">
          <button type="submit" className="submit-button">
            Stake and Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterTLD;
