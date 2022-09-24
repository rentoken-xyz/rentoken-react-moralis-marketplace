const OkenV1RentMarketplace_address = "0x543ebEAAfb78c0E1461eC48EC7b6706f1eD16F53";
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

module.exports = {
    OkenV1RentMarketplace_address,
    OkenV1RentMarketplace_abi,
};
