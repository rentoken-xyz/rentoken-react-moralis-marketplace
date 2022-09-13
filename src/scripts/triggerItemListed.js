import { useWeb3ExecuteFunction } from "react-moralis";
const contractProcessor = useWeb3ExecuteFunction();

let options = {
    abi: {
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
                internalType: "uint64",
                name: "expires",
                type: "uint64",
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
    contractAddress: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    functionName: "listItem",
    params: {
        nftAddress: "0xd7604195e9b950887785540744775a40e6f12659",
        tokenId: "2",
        expires: "1663180871",
        pricePerSecond: "1234567890000000000",
        payToken: "address(0)",
    },
};

await contractProcessor.fetch({
    params: options,
});
