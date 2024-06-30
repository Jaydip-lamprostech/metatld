import React, { useState } from "react";
import "./DomainOwnership.css";
import AvatarGenerator from "../AvatarGenerator";
import { Tooltip } from "react-tooltip";
import TransferDomainPopup from "./TransferDomainPopup";
// import baseContractABI from "../../artifacts/contracts/Base.json";
// import resolverContractABI from "../../artifacts/contracts/PublicResolver.json";
// import registryResolverContractABI from "../../artifacts/contracts/SidRegistry.json";
import DomainInformation from "../DomainInformation";
import { ethers } from "ethers";
import { getSubnode } from "./ProfileDetails";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import EditRolesForDomain from "./EditRolesForDomain";

function DomainOwnership(props) {
  const [ownershipDetails, setOwnershipDetails] = useState({});
  const [loading, setloading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAlternateIcon, setShowAlternateIcon] = useState(false);
  const [showTransferDomainPopup, setTransferDomainPopup] = useState(false);
  const [showEditRolesPopup, setEditRolesPopup] = useState(false);

  const handleClick = (text, index) => {
    navigator.clipboard.writeText(text);
    // Show the alternate SVG for a few seconds
    setSelectedItem(index);
    setShowAlternateIcon(true);

    setTimeout(() => {
      setShowAlternateIcon(false);
    }, 2000); // Adjust the duration as needed (in milliseconds)
  };

  const getOwnershipDetails = async () => {
    try {
      const domainName = props.domainDetails.name.replace(".mode", "");
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const signer = provider.getSigner();

      const resolverContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
          : chainId === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_RESOLVER
          : null;

      const baseContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE
          : chainId === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID_BASE
          : null;

      const registryContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_REGISTRY
          : chainId === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_REGISTRY
          : null;

      //to find a eth record address of the domain name
      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        // resolverContractABI.abi,
        signer
      );
      const node = getSubnode(domainName);
      const record = await resolverContract.addr(node);

      // to find resolver and manager address of the domain name
      const registryResolverContract = new ethers.Contract(
        registryContractAddress,
        // registryResolverContractABI.abi,
        signer
      );
      const resolver = await registryResolverContract.resolver(node);
      const manager = await registryResolverContract.owner(node);

      //to find a owner of the domain name
      const baseContract = new ethers.Contract(
        baseContractAddress,
        // baseContractABI.abi,
        signer
      );
      const tokenId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(domainName)
      );
      const owner = await baseContract.ownerOf(tokenId);
      // console.log("owner - ", owner);

      const addressToRoles = transformRolesToAddressRoles({
        owner: owner,
        record: record,
        manager: manager,
      });
      // console.log(addressToRoles);
      setOwnershipDetails(addressToRoles);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnershipDetails();
  }, []);

  const transformRolesToAddressRoles = (roles) => {
    const addressToRoles = {};

    Object.entries(roles).forEach(([role, address]) => {
      if (!addressToRoles[address]) {
        addressToRoles[address] = [];
      }
      addressToRoles[address].push(role);
    });

    return addressToRoles;
  };
  const getTooltipContent = (role) => {
    switch (role) {
      case "owner":
        return "The Owner is the ultimate owner of the name. For .mode names the Owner (formerly Registrant) of a name can change the Manager and transfer ownership. Not all names will have an owner.";
      case "record":
        return "The address that will receive funds sent to this name on mode mainnet.";
      case "manager":
        return "The address that can change the profile, settings and profile editors.";
      // Add cases for other roles as needed
      default:
        return "Default tooltip content.";
    }
  };

  return (
    <>
      <div className="profileChildComponent">
        <h2 className="profileComingSoonTitle">🚀 COMING SOON 🚀</h2>
        <p className="profileNavbarComponentInfo">
          We're gearing up to introduce subnames, a unique feature that adds an
          extra layer to your domain experience. In the world of domains, a
          subname is like a sibling to the main name, inheriting its essence and
          purpose. Exciting things are on the horizon, so stay tuned!
        </p>
      </div>
    </>
  );
}

export default DomainOwnership;
