import React from "react";
import { ethers } from "ethers";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export const Deployer = (account) => {
  const { isWeb3Enabled } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const OKEN_V1_RENTABLE_NFT_FACTORY_CONTRACT_ADDRESS =
    process.env.REACT_APP_OKEN_V1_RENTABLE_NFT_FACTORY_CONTRACT_ADDRESS;

  console.log(`isWeb3Enabled`, isWeb3Enabled);

  const [formData, setFormData] = React.useState({
    deployRentableNftContract: 0,
    name_: "",
    symbol_: "",
    mintFee: 0,
    feeRecipient: "0x9F680FCD28925064a7f5836F6b8bc45fCF8DFF60",
    mintRentableNft_to: "",
    mintRentableNft_uri: "",
    mintRentableNft_gasLimit: 0,
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
          outputs: [{ internalType: "address", name: "", type: "address" }],
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

    await getRentableNftAddress();
  }

  async function getRentableNftAddress() {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-Key": `${API_KEY}` },
    };

    fetch(
      `https://deep-index.moralis.io/api/v2/${OKEN_V1_RENTABLE_NFT_FACTORY_CONTRACT_ADDRESS}/logs?chain=goerli`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const _rentableNftAddress = "0x" + response.result[0].topic2.slice(-40);
        console.log("_rentableNftAddress is: " + _rentableNftAddress);
        return _rentableNftAddress;
      })
      .catch((err) => console.error(err));
  }

  async function mintRentableNft() {
    let options = {
      contractAddress: "0xeeb8003a8e1f30392a52f73d38976390c3915164",
      functionName: "mint",
      abi: [
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
      ],
      params: {
        to: formData.mintRentableNft_to,
        uri: formData.mintRentableNft_uri,
      },
    };

    await contractProcessor.fetch({
      params: options,
      onError: (error) => console.log(error),
    });
  }

  async function mintRentableNftScripted() {
    let options = {
      contractAddress: "0xeeb8003a8e1f30392a52f73d38976390c3915164",
      functionName: "mint",
      abi: [
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
      ],
      params: {
        to: "0x3b9faf4fd67b348f8a901df88f28d19efee0f120",
        uri: "''",
      },
    };

    await contractProcessor.fetch({
      params: options,
      onError: (error) => console.log(error),
    });
  }

  async function getRentableNftEvents() {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-Key": `${API_KEY}` },
    };

    fetch(
      `https://deep-index.moralis.io/api/v2/0xeeb8003a8e1f30392a52f73d38976390c3915164/logs?chain=goerli`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response.result))
      .catch((err) => console.error(err));
  }

  async function ethersStart() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    // const contractAddress = "0x94d7cfbca63cd5ac5af36ce32b55af5d537575ce";
    const contractAddress = await getRentableNftAddress();

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
    ];

    const rentableNftContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    // You need to connect to a Signer, so that you can pay to send state-changing transactions.
    const rentableNftWithSigner = rentableNftContract.connect(signer);

    // const weiGasLimit = ethers.utils.parseEther("1.5");
    // console.log(weiGasLimit.toString());

    console.log("Contract address before calling mint: ", contractAddress);
    await rentableNftContract.mint(
      formData.mintRentableNft_to,
      formData.mintRentableNft_uri,
      {
        gasLimit: 800000,
      }
    );
  }

  // ethersStart();

  async function mint() {}

  return (
    <div>
      <form>
        <div className="bg-indigo-300 ">
          <div className="container flex flex-col justify-center text-center sm:py-20 sm:px-6 lg:px-8">
            <div className="justify-center items-center flex flex-col">
              <label className="mt-8">deployRentableNftContract</label>
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

            <div className="justify-center items-center flex flex-col">
              <label className="mt-8">URI</label>

              <input
                type="text"
                placeholder="URI"
                onChange={handleChange}
                name="mintRentableNft_uri"
                value={formData.mintRentableNft_uri}
                className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="justify-center items-center flex flex-col">
              <label className="mt-8">Gas Limit</label>

              <input
                type="number"
                placeholder="gasLimit"
                onChange={handleChange}
                name="mintRentableNft_gasLimit"
                value={formData.mintRentableNft_gasLimit}
                className="w-1/2 p-2 rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => ethersStart()}
              className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Mint Rentable Nft Contract
            </button>
          </div>
        </div>
      </form>
      {/* <button
                type="button"
                onClick={() => ethersStart()}
                className="m-8 p-2 h-1/3 items-center justify-center rounded-md border border-transparent px-5  text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Mint Rentable Nft Contract
            </button> */}
    </div>
  );
};
