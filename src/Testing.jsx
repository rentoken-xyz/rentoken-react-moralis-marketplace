import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { BigNumber, ethers } from "ethers";

const OkenV1RentMarketplace_abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "platformFee",
        type: "uint16",
      },
      {
        internalType: "address payable",
        name: "feeRecipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "addressRegistry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AlreadyListed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CurrentlyRented",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "InvalidCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "InvalidNftAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "InvalidPayToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "InvalidTimestamps",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "NoProceeds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NotApproved",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "NotListed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePerSecond",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "ItemListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ItemRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "renter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "ItemRented",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ListingCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePerSecond",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "ListingUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proceeds",
        type: "uint256",
      },
    ],
    name: "ProceedsWithdrawn",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddressRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeRecipient",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "getListing",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "end",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pricePerSecond",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "payToken",
            type: "address",
          },
        ],
        internalType: "struct IOkenV1RentMarketplace.Listing",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getOwnerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlatformFee",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "getProceeds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pricePerSecond",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "redeemItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "rentItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAddressRegistry",
        type: "address",
      },
    ],
    name: "setAddressRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "newFeeRecipient",
        type: "address",
      },
    ],
    name: "setFeeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "newPlatformFee",
        type: "uint16",
      },
    ],
    name: "setPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pricePerSecond",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "updateListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payToken",
        type: "address",
      },
    ],
    name: "withdrawProceeds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const Testing = () => {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  console.log(`isWeb3Enabled`, isWeb3Enabled);

  const ethers_OkenV1RentMarketplace_listItem = async (
    nftAddress,
    nftId,
    start,
    end,
    pricePerSecond,
    payToken
  ) => {
    const rentMarketplaceAddress = "0x1c827b0517aBE2dA491b18544Ae53697A39B239A";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const rentMarketplace = new ethers.Contract(
      rentMarketplaceAddress,
      OkenV1RentMarketplace_abi,
      signer
    );

    const tx = await rentMarketplace
      .connect(signer)
      .listItem(nftAddress, nftId, start, end, pricePerSecond, payToken, {
        gasLimit: BigNumber.from("800000"),
      });
  };

  return (
    <div>
      <div className="flex-column content-center">
        <h1 className="text-center">testing page</h1>
        <div className="grid place-items-center">
          <button
            className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              await ethers_OkenV1RentMarketplace_listItem(
                "0xadbfb54ccb335cdf398fdfaf1dae186505b58d6e",
                BigNumber.from("0"),
                BigNumber.from("0"),
                BigNumber.from(2).pow(64).sub(1),
                ethers.utils.parseEther("0.0000000869373974"),
                "0x0000000000000000000000000000000000000000"
              );
              console.log("works");
            }}
          >
            List Item
          </button>
        </div>
      </div>
    </div>
  );
};
