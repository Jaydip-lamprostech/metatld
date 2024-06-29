import React, { useState } from "react";
import "../styles/RegisterTLD.css";
import { useSearchParams } from "react-router-dom";
import TldFactoryABI from "../artifacts/contracts/admin/TldFactory.sol/TldFactory.json";
import { ethers } from "ethers";
import { useChainId } from "wagmi";
import { toBigInt } from "web3-utils";
import { wagmiConfig } from "../wagmi";
import { getEthersSigner } from "../components/getEtherSigner";
import { getEthersProvider } from "../components/getEthersProvider";

function RegisterTLD() {
  const [searchParams] = useSearchParams();
  const tldName = searchParams.get("tldName");
  const [identifi, setIdentifier] = useState();
  const [showTLDName, setTLDName] = useState(
    tldName ? tldName.toLowerCase() : ""
  );
  const chainId = 84532;
  // console.log("chainid",chainId);

  const [letterConfigurations, setLetterConfigurations] = useState([
    { letter: "3 letters", price: "" },
    { letter: "4 letters", price: "" },
    { letter: "More than 4 letters", price: "" },
  ]);

  const [minDomainLength, setMinDomainLength] = useState("");
  const [maxDomainLength, setMaxDomainLength] = useState("");
  const [minRegistrationDuration, setMinRegistrationDuration] = useState("");
  const [minRenewDuration, setMinRenewDuration] = useState("");
  const [mintCap, setMintCap] = useState("");

  const minRegistrationDurationInSeconds =
    parseInt(minRegistrationDuration) * 365 * 24 * 60 * 60;
  const minRenewDurationInSeconds =
    parseInt(minRenewDuration) * 365 * 24 * 60 * 60;

  const handleInputChange = (index, event) => {
    const values = [...letterConfigurations];
    values[index][event.target.name] = event.target.value;
    setLetterConfigurations(values);
  };

  const handleStake = async (contract, tldOwner, tldName, chainId) => {
    const MINIMUM_STAKE = "0.01"; // Replace with actual minimum stake value
    const stakeAmount = ethers.utils.parseUnits(MINIMUM_STAKE, "ether");
    const identifier = calIdentifier(chainId, tldOwner, tldName);
    console.log("identifier", identifier);
    try {
      const tx = await contract.stake(identifier, tldName, {
        value: stakeAmount,
      });
      await tx.wait();
      alert("Stake successful!");
      return true;
    } catch (error) {
      console.error("Staking failed", error);
      alert("Staking failed");
      return false;
    }
  };

  // const toBigInt = (num) => BigInt(num);

  const calIdentifier = (chainId, owner, tld) => {
    const hash = ethers.utils.solidityKeccak256(
      ["address", "string"],
      [owner, tld]
    );
    return (
      (toBigInt(chainId) << toBigInt(224)) +
      (toBigInt(hash) >> toBigInt(32))
    ).toString();
  };

  // stake and deploy
  const handleStakeAndRegister = async (event) => {
    event.preventDefault();

    if (!window.ethereum) {
      alert("Please install Smart Wallet!");
      return;
    }

    const signer = await getEthersSigner(wagmiConfig);
    console.log(signer);
    // const contractAddress = process.env.REACT_APP_TLD_FACTORY;
    // console.log("tldfactory contract address:", contractAddress);
    const contract = new ethers.Contract(
      "0x79bED8A36B5Bb2f57268242FE53a0D4F3aFbf573",
      TldFactoryABI.abi,
      signer
    );

    // const ethPerUsd = 1 / 3000;

    // const prices = letterConfigurations.map((config) =>
    //   ethers.utils.parseUnits((config.price * ethPerUsd).toString(), "ether")
    // );
    const tldOwner = await signer.getAddress();

    // const now = await getCurrentUnixTime();

    const referralComissions = [
      {
        minimumReferralCount: 1,
        referrerRate: 10,
        refereeRate: 5,
        isValid: true,
      },
      {
        minimumReferralCount: 3,
        referrerRate: 15,
        refereeRate: 10,
        isValid: true,
      },
    ];

    // Set the public registration start time to 2 minutes from now
    const provider = await getEthersProvider(wagmiConfig);
    const latestBlock = await provider.getBlock("latest");
    const publicRegistrationStartTime = latestBlock.timestamp + 120;

    console.log(publicRegistrationStartTime);

    const initData = {
      baseUri: "https://gateway.lighthouse.storage/ipfs/", // Add the base URI if applicable
      // config: {
      //   minDomainLength: parseInt(minDomainLength),
      //   maxDomainLength: parseInt(maxDomainLength),
      //   minRegistrationDuration: minRegistrationDurationInSeconds,
      //   minRenewDuration: minRenewDurationInSeconds,
      //   mintCap: parseInt(mintCap),
      // },
      config: {
        minDomainLength: 3,
        maxDomainLength: 10,
        minRegistrationDuration: 31556952,
        minRenewDuration: 31556952,
        mintCap: 0,
      },
      letters: [3, 4, 5],
      prices: [20597680029427, 5070198161089, 158443692534],
      enableGiftCard: true,
      giftCardTokenIds: [],
      giftCardPrices: [],
      enableReferral: true,
      referralLevels: [1, 2],
      referralComissions: referralComissions,
      enablePreRegistration: false, // Disable pre-registration
      preRegiConfig: {
        enableAuction: false,
        auctionStartTime: 0,
        auctionInitialEndTime: 0,
        auctionExtendDuration: 0,
        auctionRetentionDuration: 0,
        auctionMinRegistrationDuration: 0,
        enableFcfs: false,
        fcfsStartTime: 0,
        fcfsEndTime: 0,
      },
      preRegiDiscountRateBps: [], // Empty pre-registration discount rates
      publicRegistrationStartTime: publicRegistrationStartTime,
      publicRegistrationPaused: false,
    };
    console.log(initData);
    try {
      const stakeSuccessful = await handleStake(
        contract,
        tldOwner,
        showTLDName,
        chainId
      );
      if (stakeSuccessful) {
        await handleCreateDomainService(contract, tldOwner, initData);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to register TLD");
    }
  };

  const handleCreateDomainService = async (contract, tldOwner, initData) => {
    try {
      const tx = await contract.createDomainService(
        showTLDName,
        tldOwner,
        initData
      );

      await tx.wait();
      alert("TLD registered successfully!");
    } catch (error) {
      console.error("Domain service creation failed", error);
      throw new Error("Domain service creation failed");
    }
  };
  // const handleCalculate = () => {
  //   const id = calIdentifier(84532, "0x2131a6c0b66be63e38558dc5fbe4c0ab65b9906e" , "meta");
  //   setIdentifier(id.toString());

  //   console.log(identifi)
  // };

  return (
    <div className="container">
      <h1 className="regtld-h1">Create Your Own TLD</h1>
      <form className="regtld-form" onSubmit={handleStakeAndRegister}>
        <div className="input-group mb-40">
          <label>TLD Name</label>
          <div className="regtld-input-parent">
            <input
              type="text"
              placeholder="spiderman.base"
              className="regtld-input"
              value={showTLDName ? "." + showTLDName : ""}
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
                value={minDomainLength}
                onChange={(e) => setMinDomainLength(e.target.value)}
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
                value={maxDomainLength}
                onChange={(e) => setMaxDomainLength(e.target.value)}
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
                value={minRegistrationDuration}
                onChange={(e) => setMinRegistrationDuration(e.target.value)}
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
                value={minRenewDuration}
                onChange={(e) => setMinRenewDuration(e.target.value)}
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
              value={mintCap}
              onChange={(e) => setMintCap(e.target.value)}
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
                    readOnly
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
            </div>
          ))}
        </div>

        <div className="stake-register">
          <button
            onClick={handleStakeAndRegister}
            type="submit"
            className="submit-button"
          >
            Stake and Register
          </button>

          {/* <button onClick={ handleCalculate}> Handle call identifier</button> */}
        </div>
      </form>
    </div>
  );
}

export default RegisterTLD;
