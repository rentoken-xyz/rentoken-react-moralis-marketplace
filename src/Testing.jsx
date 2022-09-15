import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export const Testing = (isAuthenticated) => {
    const { Moralis, isWeb3Enabled } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();

    console.log(`isWeb3Enabled`, isWeb3Enabled);

    async function donate(val) {
        let options = {
            contractAddress: "0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9",
            functionName: "newDonation",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "note",
                            type: "string",
                        },
                    ],
                    name: "newDonation",
                    outputs: [],
                    stateMutability: "payable",
                    type: "function",
                },
            ],
            params: {
                note: "Thanks for your work",
            },
            msgValue: Moralis.Units.ETH(val),
        };

        await contractProcessor.fetch({
            params: options,
            onError: (error) => {
                console.log("zebi t'as fais une erreur");
                console.log(error);
            },
        });
    }

    async function listItem() {
        let options = {
            contractAddress: "0xe82D3B87100B22C51D4F3d2127823fc7CC267F3e",
            functionName: "listItem",
            abi: [
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
            ],
            params: {
                nftAddress: "0xd7604195e9b950887785540744775a40e6f12659",
                tokenId: "2",
                expires: "1663253158",
                pricePerSecond: "1234567890000000000",
                payToken: "0x0000000000000000000000000000000000000000",
            },
        };

        await contractProcessor.fetch({
            params: options,
            onError: (error) => console.log(error),
        });
    }

    return (
        <div>
            <div className="flex-column content-center">
                <h1 className="text-center">testing page</h1>
                <div className="grid place-items-center">
                    <button
                        className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            console.log("clicked!");
                            console.log(isAuthenticated);
                            return donate(0.1);
                        }}
                    >
                        Donation Testing
                    </button>
                    <button
                        className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            console.log("clicked!");
                            console.log(isAuthenticated);
                            return listItem();
                        }}
                    >
                        Listing Testing
                    </button>
                </div>
            </div>
        </div>
    );
};
