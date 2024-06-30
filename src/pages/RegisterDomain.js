import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/RegisterDomain.css";
import { Tooltip } from "react-tooltip";
import { toBigInt } from "web3-utils";
import { ethers } from "ethers";
import axios from "axios";
import { useAccount, useChainId } from "wagmi";
import { getEthersProvider } from "../components/getEthersProvider";
import { wagmiConfig } from "../wagmi";
import { getEthersSigner } from "../components/getEtherSigner";
import registrarController_abi from "../artifacts/contracts/controller/RegistrarController.sol/RegistrarController.json";

function RegisterDomain() {
  const chainId = useChainId();
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchDomain = searchParams.get("query");
  console.log(searchDomain);
  const tldName = searchParams.get("tldName");
  console.log(tldName);
  const { address } = useAccount();
  const tldIdentifier = searchParams.get("tldIdentifier");
  console.log(tldIdentifier);
  const domainPrice = searchParams.get("domainPrice");
  console.log(domainPrice);
  const [showTLDName, setTLDName] = useState(
    tldName ? tldName.toLowerCase() : ""
  );
  const [transactionState, setTransactionState] = useState({
    waiting: false,
    msg: "",
  });
  const [nameRegistered, setNameRegistered] = useState(false);

  const [ethPrice, setEthPrice] = useState(null);
  const [fetchingValue, setfetchingValue] = useState(false);
  const [domainPricewithRegistrationTime, setDomainPricewithRegistrationTime] =
    useState(0);

  const [showDomainName, setDomainName] = useState(
    searchDomain ? searchDomain.toLowerCase() : ""
  );

  const [domainNamePrice, setdomainNamePrice] = useState(1);

  const [registrationPeriod, setRegistrationPeriod] = useState(1);
  const handlePeriodDecrease = () => {
    if (registrationPeriod !== 1) setRegistrationPeriod((prev) => prev - 1);
  };

  const handlePeriodIncrease = () => {
    setRegistrationPeriod((prev) => prev + 1);
  };

  const domainPriceCheck = async (name) => {
    try {
      setfetchingValue("fetching...");

      const provider = await getEthersProvider(wagmiConfig);

      const con = new ethers.Contract(
        "0x4EF8A2cCc0336298cd4e8f6eF3C3FBd4E5C26326",
        registrarController_abi.abi,
        provider
      );
      const registrationDuration = 31556952 * registrationPeriod;
      // console.log(props.registrationPeriod);
      // const price = await con.getRegistrationPrice(name);

      const estimatedPriceArray = await con.rentPrice(
        tldIdentifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      const price = base + parseInt(premium);

      // console.log(ethers.utils.formatEther(price));
      let x = price / 10 ** 18;
      let priceshort = parseFloat(x.toFixed(7));
      setDomainPricewithRegistrationTime(priceshort + " ETH");
      setfetchingValue(false);
      // props.setRegisterdomainPriceInWei(price);
      // const eth = ;
      // props.setFilteredUsers(details);
    } catch (error) {
      console.log("Error:", error);
      setfetchingValue("error");
      // Handle other errors
    }
  };

  useEffect(() => {
    const checking = async () => {
      await domainPriceCheck(showDomainName);
    };
    if (showDomainName) {
      checking();
    }
  }, [registrationPeriod]);

  // useEffect to fetch data from the CoinGecko API
  useEffect(() => {
    // Function to fetch ETH price
    const fetchEthPrice = async () => {
      try {
        // Make a GET request to the CoinGecko API
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "ethereum",
              vs_currencies: "usd",
            },
          }
        );

        // Extract the ETH price from the response
        const price = response.data.ethereum.usd;

        // Set the ETH price in the component state
        setEthPrice(price);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    // Call the fetchEthPrice function
    fetchEthPrice();
    // Fetch data every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchEthPrice, 200000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const calculateValueInUSD = (ethAmount) => {
    return (parseFloat(ethAmount) * ethPrice).toFixed(4);
  };
  const domainPriceInETH = domainPricewithRegistrationTime
    ? domainPricewithRegistrationTime
    : domainNamePrice + " ETH";
  const domainPriceInUSD = calculateValueInUSD(
    domainPricewithRegistrationTime
      ? domainPricewithRegistrationTime
      : domainNamePrice
  );

  const registerName = async () => {
    setTransactionState({ waiting: true, msg: "Waiting for Transaction" });
    try {
      // Ensure that the user is connected to the expected chain
      const provider = await getEthersProvider(wagmiConfig);

      const signer = await getEthersSigner(wagmiConfig);

      const contract = new ethers.Contract(
        "0x4EF8A2cCc0336298cd4e8f6eF3C3FBd4E5C26326",
        // contract_abi.abi,
        registrarController_abi.abi,
        signer
      );

      const name = showDomainName;

      const registrationDuration = 31556952 * registrationPeriod; // 1 year in seconds

      const estimatedPriceArray = await contract.rentPrice(
        tldIdentifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      // console.log(estimatedPriceArray);
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      let finalPrice = base + premium;
      // console.log(finalPrice);

      finalPrice = finalPrice * 1.1;

      const extDt = ["0x"];
      // console.log(finalPrice);
      // console.log("Base Price (Wei):", base.toString());
      // console.log("Premium Price (Wei):", premium.toString());
      console.log(
        tldIdentifier.toString(),
        [name],
        address,
        registrationDuration,
        "0xD49C49CCc236Cf9c4159E2211a7C45e89cA859d7",
        parseInt(finalPrice).toString(),
        extDt
      );
      // console.log(contract);

      const tx = await contract.bulkRegister(
        tldIdentifier,
        [name],
        address,
        registrationDuration,
        "0xD49C49CCc236Cf9c4159E2211a7C45e89cA859d7",
        true,
        extDt,
        {
          value: parseInt(finalPrice).toString(),
          // gasLimit: 2000000, // Manually set a sufficient gas limit
        }
      );
      setTransactionState({ waiting: true, msg: "Transacting..." });
      const txhash = await tx.wait();
      console.log(txhash);

      console.log("Name registered successfully!");
      setNameRegistered(true);
      setTransactionState({
        waiting: true,
        msg: "Name registered successfully!",
      });
      navigate(`/user/${address}`);

      // setTimeout(() => {

      //   navigate("/profile", { state: { reload: true } });
      // }, 2000);
    } catch (error) {
      // console.log(error);
      // console.log(Object.keys(error));
      // console.log(error.code);
      // console.log(error.reason);

      setTransactionState({ waiting: false, msg: "" });
      // const parsedEthersError = getParsedEthersError(error);
      // // const err = parsedEthersError.context?.split("(")[0];
      console.log(error.reason ? error.reason : error);
      // if (error.message.includes("Address is already registered with a name"))
      //   setErrorMessage(
      //     "You already have claimed one handle, get more on Mainnet."
      //   );

      // else if (error.message.includes("Insufficient funds sent"))
      //   setErrorMessage("Insufficient funds to cover the transaction.");

      // setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="regtld-h1">Domain Registration</h1>
      <form className="regtld-form">
        <div className="input-group mb-40">
          <label>Domain Name</label>
          <div className="regtld-input-parent">
            <input
              type="text"
              placeholder="spiderman.base"
              className="regtld-input"
              value={
                showDomainName && showTLDName
                  ? showDomainName + "." + showTLDName
                  : null
              }
              readOnly
            />
          </div>
        </div>

        <div className="regtld-config-heading">
          <span>Configuration</span>
        </div>

        <div className="registartion_fields">
          <div className="registration_field_item">
            <div className="registration_field_title">
              <span className="field_title">Registration Period</span>
              <span
                className="field_info"
                data-tooltip-id="registration-period"
                data-tooltip-content="The number of years you will have right over this domain"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <g>
                      <g>
                        <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z" />
                      </g>
                      <g>
                        <path d="M9,19h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v0C8,18.55,8.45,19,9,19z" />
                      </g>
                      <g>
                        <path d="M12,2C7.86,2,4.5,5.36,4.5,9.5c0,3.82,2.66,5.86,3.77,6.5h7.46c1.11-0.64,3.77-2.68,3.77-6.5C19.5,5.36,16.14,2,12,2z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <Tooltip
                id="registration-period"
                removeStyle
                style={{
                  maxWidth: "200px",
                  wordBreak: "break-word",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              />
            </div>
            <div className="registartion_field_input registration_period">
              <span className="registration_period_time">
                <span>{registrationPeriod}</span> Year
              </span>
              <div className="registration_period_modification">
                <span
                  className={
                    registrationPeriod === 1
                      ? "period_decrease opacity_low"
                      : "period_decrease"
                  }
                  // className="period_decrease opacity_low"
                  onClick={handlePeriodDecrease}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
                  </svg>
                </span>
                <span
                  className="period_increase"
                  onClick={handlePeriodIncrease}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                  </svg>
                </span>
                {/* <Tooltip
                      id="increase-decrease-period"
                      removeStyle
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        lineHeight: "normal",
                        maxWidth: "200px",
                        wordBreak: "break-word",
                        fontFamily: "Inter, sans-serif",
                      }}
                    /> */}
              </div>
            </div>
          </div>

          <div className="registration_field_item">
            <div className="registration_field_title">
              <span className="field_title">
                {"Domain Cost "}
                <span className="field-sub-title">(Excluding Gas Fees)</span>
              </span>
              <span
                className="field_info"
                data-tooltip-id="domain-cost"
                data-tooltip-content="The cost is for the period selected."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <g>
                      <g>
                        <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z" />
                      </g>
                      <g>
                        <path d="M9,19h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v0C8,18.55,8.45,19,9,19z" />
                      </g>
                      <g>
                        <path d="M12,2C7.86,2,4.5,5.36,4.5,9.5c0,3.82,2.66,5.86,3.77,6.5h7.46c1.11-0.64,3.77-2.68,3.77-6.5C19.5,5.36,16.14,2,12,2z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <Tooltip
                id="domain-cost"
                removeStyle
                style={{
                  maxWidth: "200px",
                  wordBreak: "break-word",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              />
            </div>
            <div className="registartion_field_input">
              <span className="registration_domain_cost">
                {fetchingValue ? fetchingValue : <>{domainPriceInETH + " "}</>}
              </span>
            </div>
            <p
              style={{
                color: "#ffffff80",
                fontSize: "1rem",
                margin: "10px",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              {"Approx. : $ " + domainPriceInUSD + " USD"}
            </p>
          </div>
        </div>
        <div className="domain-register">
          {transactionState.waiting ? (
            <div className="submit-button">
              {transactionState.msg}
              {!nameRegistered && <div className="sp sp-wave"></div>}
            </div>
          ) : (
            <button
              type="button"
              className="submit-button"
              onClick={registerName}
            >
              Domain Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterDomain;
