# MetaTLDs - Decentralized TLD Registration and Management Platform

MetaTLDs is a decentralized platform that empowers users to create and manage their own Top-Level Domains (TLDs) using blockchain technology. By staking ETH, users can seamlessly register domains under these TLDs without the need for central authority approval. This platform provides a transparent, flexible, and cost-effective solution for TLD management.

## Table of Contents

1. [Introduction](#introduction)
2. [Issues with Traditional TLD Registration](#issues-with-traditional-tld-registration)
3. [Permissionless TLDs](#permissionless-tlds)
4. [One-Click Staking and Deployment](#one-click-staking-and-deployment)
5. [Smart Contract Overview](#smart-contract-overview)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Functions](#functions)
9. [Events](#events)

## Introduction

### Project Overview:
MetaTLDs is a decentralized platform for TLD (Top-Level Domain) registration and domain management using blockchain technology. It empowers users to create and manage their own TLDs by staking ETH, with seamless domain registration under these TLDs.

## Issues with Traditional TLD Registration

### Centralized Control:
- Limited number of organizations (e.g., ICANN) control TLD registration.
- High barriers to entry for new TLDs.

### High Costs:
- Expensive application and maintenance fees for new TLDs.

### Lack of Flexibility:
- Inflexible policies and restrictions on TLD management.

### Transparency Issues:
- Limited transparency in the TLD allocation process.
- Need for developers to deploy the contract for registering new TLDs.

## Permissionless TLDs

### Open Access:
- Any DAO, protocol, or organization can create their own TLD and accommodate their users or community members, making them feel part of the DAO or organization.
- No need for approval from central authorities.

### Empowerment:
- Provides equal opportunity for everyone to establish their unique TLD.

### Diverse Use Cases:
- Suitable for personal, business, community, and protocol-specific TLDs.

### Innovation and Flexibility:
- Encourages creativity in domain naming and management.

## One-Click Staking and Deployment

### Simple Process:
- Users can stake ETH and deploy their TLD contract with just one click.
- No need for developers to deploy the TLD registration smart contract; any normal user can do it with one click.

### User-Friendly Interface:
- Intuitive platform design for easy TLD creation and management.

### Smart Contract Automation:
- Automated deployment of TLD smart contracts ensures security and efficiency.

### Instant Deployment:
- Immediate availability of the TLD after staking and deployment.

## Smart Contract Overview

The `TldFactory` smart contract is the core of the MetaTLDs platform. It handles the creation, configuration, and management of TLDs, including support for price models, pre-registration, gift cards, referrals, and staking.

## Installation

To use this contract, you need to have the Solidity compiler installed. You can install it via npm:

## Contracts

You can find the smart contracts for the metaTLDs project [here](https://github.com/bhadresh-lamprostech/metaTlds).


## Getting Started

### Installation

To install Hardhat and set up your environment:

```bash
npm install --save-dev hardhat

```
## Compiling Contracts
To compile your metaTLDs contracts:

```bash
npx hardhat compile
```

# Running Tests
To run tests (assuming tests are set up in your project):

```bash
npx hardhat test
```

## Usage

1. Deploy the contract using a Solidity compiler or an IDE like Remix.
2. Initialize the contract by calling the `initialize` function with the required parameters.
3. Use the `createDomainService` function to create new TLDs.

![metatld-final](https://github.com/Jaydip-lamprostech/metatld/assets/106816090/48b679c3-c656-4258-ba88-8fec3686d09a)


## Functions

### Initialization

#### `initialize`
Initializes the TldFactory contract with the necessary parameters.

```solidity
function initialize(
    IBaseCreator _baseCreator,
    IRegistrarController _controller,
    address _platformConfig,
    address _priceOracle,
    GiftCardVoucher _giftCardVoucher,
    GiftCardLedger _giftCardLedger,
    ReferralHub _referralHub,
    IPreRegistrationCreator _preRegiCreator,
    PrepaidPlatformFee _prepaidPlatformFee
) public initializer onlyPlatformAdmin

```
# Domain Creation

## createDomainService
Creates a new TLD.

```solidity
function createDomainService(
    string calldata tld,
    address tldOwner,
    TldInitData calldata initData
) external override returns (uint256 identifier)
```

# Staking
## stake
Allows users to stake ETH for a TLD.

```solidity
function stake(uint256 identifier, string calldata tld, bytes32[] memory proof) external payable
```
## unStake
Allows users to withdraw their staked ETH.

```solidity
function unStake() external
```
## getStakeDetails
Returns the staking details for the caller.
```solidity
function getStakeDetails() external view returns (address owner, uint256 identifier, uint256 stakedAmount)
```

# Price Oracle
## setDefaultPriceOracle
Sets the default price oracle.
```solidity
function setDefaultPriceOracle(address _defaultPriceOracle) external onlyPlatformAdmin
```

# Merkle Root
## updateMerkleRoot
Updates the Merkle root for the TLDs.
```solidity
function updateMerkleRoot(string memory _merkleRoot) external onlyPlatformAdmin
```

# Availability Check
## checkAvailability
Checks if a TLD is available for registration.

```solidity
function checkAvailability(string calldata tld, bytes32[] memory proof) public view returns (bool)
```
# Events

- Staked: Emitted when a user stakes ETH.
- UnStake: Emitted when a user withdraws their staked ETH.
- NewDomainService: Emitted when a new TLD is created.
- SetDefaultPriceOracle: Emitted when the default price oracle is set.

# Modifiers

- hasStaked: Ensures the user has staked the required amount of ETH.

