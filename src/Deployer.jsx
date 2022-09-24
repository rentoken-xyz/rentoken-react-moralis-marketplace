import React from "react";
import { ethers } from "ethers";

export const Deployer = () => {
    const [formData, setFormData] = React.useState({
        deployRentableNftContract: 0,
        name_: "",
        symbol_: "",
        mintFee: 0,
        feeRecipient: "0x9F680FCD28925064a7f5836F6b8bc45fCF8DFF60",
        mintRentableNft_to: "",
        rentableNftContract: "",
    });
    const factoryContract = "0xCe1776104c88B5c3b063E1f4437fF99e8Fe0a010";
    const [rentableNftContractAddress, setRentableNftContractAddress] = React.useState(
        "0xff151325d769bf638e2b229288e8e6d0eb1caba6"
    );

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    async function ethersMint() {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner();

        const contractAbi = [
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "uri",
                        type: "string",
                    },
                ],
                name: "mint",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [],
                name: "getTokenCounter",
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
        ];

        const rentableNftContract = new ethers.Contract(
            rentableNftContractAddress,
            contractAbi,
            signer
        );

        // You need to connect to a Signer, so that you can pay to send state-changing transactions.
        const rentableNftWithSigner = rentableNftContract.connect(signer);

        const tokenCounter = await rentableNftContract.getTokenCounter();
        console.log("Contract address before calling mint: ", rentableNftContractAddress);
        console.log("Token id before calling mint: ", tokenCounter.toString());
        await rentableNftContract.mint(
            formData.mintRentableNft_to,
            "https://source.unsplash.com/7MyzSlrUsVk/600x300",
            {
                gasLimit: 800000,
            }
        );
        // contract.queryFilter( event [ , fromBlockOrBlockHash [ , toBlock ] )
        // rentableNftContract.queryFilter(Event);
    }

    async function ethersDeploy() {
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner();

        const contractAddress = factoryContract;

        const contractAbi = [
            {
                inputs: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "symbol",
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
                name: "deployNftContract",
                outputs: [
                    {
                        internalType: "address",
                        name: "",
                        type: "address",
                    },
                ],
                stateMutability: "payable",
                type: "function",
            },
        ];

        const deployRentableNftContract = new ethers.Contract(contractAddress, contractAbi, signer);

        // You need to connect to a Signer, so that you can pay to send state-changing transactions.
        const DeployRentableNftWithSigner = deployRentableNftContract.connect(signer);

        const tx = await deployRentableNftContract.deployNftContract(
            "Rentoken_" + formData.name_,
            "RT" + formData.symbol_,
            formData.mintFee,
            formData.feeRecipient
        );
        // Wait until the tx has been confirmed (default is 1 confirmation)
        const receipt = await tx.wait();
        console.log(receipt);
        // Get nftAddress from event
        setRentableNftContractAddress(
            "0x" + receipt.events[receipt.events.length - 1].topics[2].slice(-40)
        );

        console.log("RentableNftContractAddress: " + rentableNftContractAddress);
    }

    return (
        <div>
            <form>
                <div className="bg-indigo-300 ">
                    <div className="container flex flex-col justify-center text-center sm:py-20 sm:px-6 lg:px-8">
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
                            onClick={() => ethersDeploy()}
                            className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Deploy Rentable Nft Contract
                        </button>
                    </div>
                </div>
            </form>
            <form>
                <div className="bg-orange-300 ">
                    <div className="container flex flex-col justify-center text-center sm:py-20 sm:px-6 lg:px-8">
                        <div className="justify-center items-center flex flex-col">
                            <label className="mt-8">To</label>
                            <input
                                type="text"
                                placeholder="To (address)"
                                onChange={handleChange}
                                name="mintRentableNft_to"
                                value={formData.mintRentableNft_to}
                                className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => ethersMint()}
                            className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Mint Rentable Nft Contract
                        </button>
                    </div>
                </div>
            </form>
            {/* <button
                type="button"
                onClick={() => ethersMint()}
                className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Mint Rentable Nft Contract
            </button> */}
        </div>
    );
};
