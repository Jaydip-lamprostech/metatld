import React, { useCallback, useEffect, useState } from "react";
import "../styles/Profile.css";
import modenft from "../assets/metatld.png";
import "../styles/AccordionPanel.css";
import { useAccount, useChainId } from "wagmi";
import WalletNotConnected from "../components/profile/WalletNotConnected";
import AccordionPanel from "../components/profile/AccordionPanel";
import ProfileDetails from "../components/profile/ProfileDetails";
import Subnames from "../components/profile/Subnames";
import PermissionsOfDomain from "../components/profile/PermissionsOfDomain";
import MoreAboutDomains from "../components/profile/MoreAboutDomains";
import DomainOwnership from "../components/profile/DomainOwnership";
import ProfileDomainNavbar from "../components/profile/ProfileDomainNavbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useApolloClient, gql } from "@apollo/client";
// import resolverContractABI from "../artifacts/contracts/PublicResolver.json";
// import reverseRegistrarABI from "../artifacts/contracts/ReverseRegistrar.json";
import { ethers } from "ethers";
import TLDInformation from "../components/TLDInformation";

const UserProfile = () => {
  const { address } = useAccount();
  const { chainId } = useChainId();
  const client = useApolloClient();

  const GET_DOMAINS = gql`
    query GetDomains {
      tlds(where: { owner: "${address}" }) {
        tld
        owner
        identifier
        id
        createdAt
        baseUri
      }
      nameRegistereds(
        where: { owner: "${address}" }
      ) {
        owner
        name
        label
        identifier
        id
        expires
        blockTimestamp
        blockNumber
        baseCost
        transactionHash
      }
    }
  `;
  const [primaryDomain, setPrimaryDomain] = useState(null);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domainFound, setDomainFound] = useState(true);
  const [tldsFound, setTldsFound] = useState(true);
  const [tlds, setTlds] = useState([]);
  //if the primary name can be fetched separately
  // const [isPrimaryDomain, setIsPrimaryDomain] = useState("");

  const [activeItems, setActiveItems] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({ query: GET_DOMAINS });
        console.log(data);
        if (data?.nameRegistereds.length > 0) {
          setDomainFound(true);
          setDomains(data?.nameRegistereds);
        }
        // else {
        //   setDomainFound(false);
        //   setDomains([]);
        // }
        if (data?.tlds.length > 0) {
          setTldsFound(true);
          setTlds(data?.tlds);
        }
        // else {
        //   setTldsFound(false);
        //   setTlds([]);
        // }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (address) fetchData();
  }, [client, address]);

  const handleNavbarClick = (instanceId, itemName) => {
    setActiveItems((prevActiveItems) => ({
      ...prevActiveItems,
      [instanceId]: itemName,
    }));
  };

  if (!address) {
    return <WalletNotConnected />;
  }

  return (
    <div className="profile-container">
      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="skeletonParentDivProfile">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                width={"100%"}
                height={50}
                style={{ margin: "10px 0" }}
              />
            ))}
          </div>
        </SkeletonTheme>
      ) : tldsFound && tlds.length > 0 ? (
        tlds.map((tld, index) => (
          <>
            <h1 className="domain_profile_page_title">Your TLDs</h1>
            <AccordionPanel key={index} title={tld.tld} isPrimary={false}>
              <TLDInformation tld={tld} />
            </AccordionPanel>
          </>
        ))
      ) : !tldsFound && tlds.length === 0 ? (
        <>
          <h1 className="domain_profile_page_title">Your TLDs</h1>
          <AccordionPanel title={"Domain not found for this address"}>
            <div className="profile-section">
              <div className="dnf-address-div">
                <p className="dnf-info">
                  Experience seamless, user-centric blockchain engagement on the
                  BASE Sepolia network with MetaTLDs.
                </p>
                <a className="claim-domain-btn" href="/search?type=tld">
                  Register TLD
                </a>
              </div>
            </div>
          </AccordionPanel>
        </>
      ) : null}

      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="skeletonParentDivProfile">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                width={"100%"}
                height={50}
                style={{ margin: "10px 0" }}
              />
            ))}
          </div>
        </SkeletonTheme>
      ) : domainFound && domains.length > 0 ? (
        domains.map((domain, index) => (
          <>
            <h1 className="domain_profile_page_title">Your Domain Names</h1>
            <AccordionPanel key={index} title={domain.name} isPrimary={false}>
              <ProfileDomainNavbar
                instanceId={`instance${index}`}
                activeItems={activeItems[`instance${index}`]}
                onClick={(itemName) =>
                  handleNavbarClick(`instance${index}`, itemName)
                }
              />

              {activeItems[`instance${index}`] === "Details" ||
              !activeItems[`instance${index}`] ? (
                <ProfileDetails
                  // modenft={modenft}
                  domainDetails={domain}
                  primaryDomain={false}
                  expiryDateInEpoch={domain.expires}
                  isNotPrimaryDomain={domain.name !== primaryDomain}
                />
              ) : activeItems[`instance${index}`] === "Ownership" ? (
                <DomainOwnership address={address} domainDetails={domain} />
              ) : activeItems[`instance${index}`] === "Subnames" ? (
                <Subnames />
              ) : activeItems[`instance${index}`] === "Permissions" ? (
                <PermissionsOfDomain />
              ) : activeItems[`instance${index}`] === "MoreDetails" ? (
                <MoreAboutDomains />
              ) : null}
            </AccordionPanel>
          </>
        ))
      ) : !domainFound && domains.length === 0 ? (
        <>
          <h1 className="domain_profile_page_title">Your Domain Names</h1>
          <AccordionPanel title={"Domain not found for this address"}>
            <div className="profile-section">
              <div className="dnf-address-div">
                <p className="dnf-info">
                  Experience seamless, user-centric blockchain engagement on the
                  BASE Sepolia network with MetaTLDs.
                </p>
                <a className="claim-domain-btn" href="/search?type=domain">
                  Claim Domain
                </a>
              </div>
            </div>
          </AccordionPanel>
        </>
      ) : null}
    </div>
  );
};

export default UserProfile;
