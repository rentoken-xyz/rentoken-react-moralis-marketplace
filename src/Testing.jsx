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

    return (
        <div>
            <div className="flex-column content-center">
                <h1 className="text-center">testing page</h1>
                <div className="grid place-items-center">
                    <button
                        onClick={() => {
                            console.log("clicked!");
                            console.log(isAuthenticated);
                            return donate(0.1);
                        }}
                    >
                        Button
                    </button>
                </div>
            </div>
        </div>
    );
};
