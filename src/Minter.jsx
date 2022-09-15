import React from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export const Minter = () => {
    const { isWeb3Enabled } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();

    console.log(`isWeb3Enabled`, isWeb3Enabled);
    const [formData, setFormData] = React.useState({
        deployRentableNftContract: 0,
        name_: "",
        symbol_: "",
        mintFee: 0,
        feeRecipient: "0x9F680FCD28925064a7f5836F6b8bc45fCF8DFF60",
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    async function deployRentableNft() {
        let options = {
            contractAddress: "0x9708806ba7e6d15dE97936361C3C6b6166E6A4a9",
            functionName: "deployRentableNftContract",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "name_",
                            type: "string",
                        },
                        {
                            internalType: "string",
                            name: "symbol_",
                            type: "string",
                        },
                        {
                            internalType: "uint256",
                            name: "mintFee",
                            type: "uint256",
                        },
                        {
                            internalType: "address payable",
                            name: "feeRecipient",
                            type: "address",
                        },
                    ],
                    name: "deployRentableNftContract",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "payable",
                    type: "function",
                },
            ],
            params: {
                deployRentableNftContract: formData.deployRentableNftContract,
                name_: formData.name_,
                symbol_: formData.symbol_,
                mintFee: formData.mintFee,
                feeRecipient: formData.feeRecipient,
            },
        };

        await contractProcessor.fetch({
            params: options,
            onError: (error) => console.log(error),
        });
    }

    return (
        <form>
            <div className="bg-indigo-300 ">
                <div className="container flex flex-col justify-center text-center sm:py-20 sm:px-6 lg:px-8">
                    <div className="justify-center items-center flex flex-col">
                        <label className="mt-8">
                            deployRentableNftContract
                        </label>
                        <input
                            type="number"
                            placeholder="deployRentableNftContract"
                            onChange={handleChange}
                            name="deployRentableNftContract"
                            value={formData.deployRentableNftContract}
                            className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="justify-center items-center flex flex-col">
                        <label className="mt-8">name_</label>

                        <input
                            type="text"
                            placeholder="name_"
                            onChange={handleChange}
                            name="name_"
                            value={formData.name_}
                            className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="justify-center items-center flex flex-col">
                        <label className="mt-8">symbol_</label>

                        <input
                            type="text"
                            placeholder="symbol_"
                            onChange={handleChange}
                            name="symbol_"
                            value={formData.symbol_}
                            className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="justify-center items-center flex flex-col">
                        <label className="mt-8">mintFee</label>

                        <input
                            type="number"
                            placeholder="mintFee"
                            onChange={handleChange}
                            name="mintFee"
                            value={formData.mintFee}
                            className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="justify-center items-center flex flex-col">
                        <label className="mt-8">feeRecipient</label>

                        <input
                            type="text"
                            placeholder="feeRecipient"
                            onChange={handleChange}
                            name="feeRecipient"
                            value={formData.feeRecipient}
                            className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => deployRentableNft()}
                        className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Deploy Rentable Nft Contract
                    </button>
                </div>
            </div>
        </form>
    );
};
