import React from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import "react-datepicker/dist/react-datepicker.css";

// abis
import RentableNftFactory from "./ABIs/contracts/RentokenV1RentableNftFactory.json";
import RentableNFTRentMarketplace from "./ABIs/contracts/RentokenV1RentableNFTRentMarketplace.json";
// icons
import { XIcon } from "@heroicons/react/outline";
import { FaEthereum } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"; // like button --> for later

import { OkenV1RentMarketplace_address } from "./deployments";
import { OkenV1RentMarketplace_abi } from "./deployments";

export const View_CardQuickView = ({
    nftAddress,
    name,
    uri,
    tokenId,
    visible,
    onClose,
}) => {
    // State for forms. React updates forms on the go, which means that
    // when submit button is clicked, data is already saved in state vars
    // forms variables are passed in smart contract functions.
    const [formData, setFormData] = React.useState({
        rentalPeriod: "",
        pricePerSecond: 0,
        deadline: "",
        expires: 0,
        // listItemForm_start: "",
        listItemForm_end: "",
        // listItemForm_listNow: false,
    });
    // const [listNow, setListNow] = React.useState(false);

    // state variables for time (later converted into Unix Timestamps to be passed in smart contracts)
    const [formDate, setFormDate] = React.useState(new Date());

    // RentableNftFactory abi and contract address
    const RentableNftFactoryABI = RentableNftFactory.abi;
    const RentableNftFactoryADDRESS = RentableNftFactory.address;

    // RentableNFTRentMarketplace abi and contract address
    const RentableNFTRentMarketplaceABI = RentableNFTRentMarketplace.abi;
    const RentableNFTRentMarketplaceADDRESS =
        RentableNFTRentMarketplace.address;

    // form input handlechange functions
    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    // handle submit data and prevents data from being erased
    // when sending requests to smart contracts or web2
    function handleSubmit(event) {
        event.preventDefault();
        // submitToApi(formData)
        console.log(formData);
    }

    const YYYY_MM_DD_to_unix = (date) => {
        // date in Date() format (yyyy-mm-dd)
        return BigNumber.from(new Date(date).getTime() / 1000);
    };

    const ethers_OkenV1RentMarketplace_listItem = async (
        nftAddress,
        nftId,
        start = BigNumber.from("0"), // if start == 0, start is set to `block.timestamp`
        end = BigNumber.from("2").pow("64").sub(1), // max uint64
        pricePerSecond = BigNumber.from("1"), // cannot be zero
        payToken = "0x0000000000000000000000000000000000000000" // set to zero address for now (ETH)
    ) => {
        // get signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        // get contract
        const rentMarketplace = new ethers.Contract(
            OkenV1RentMarketplace_address,
            OkenV1RentMarketplace_abi,
            signer
        );

        // YYYY_MM_DD_to_unix(formData.listItemForm_start);
        // YYYY_MM_DD_to_unix(end);

        // console.log(YYYY_MM_DD_to_unix(start));

        // list item
        await rentMarketplace
            .connect(signer)
            .listItem(nftAddress, nftId, start, end, pricePerSecond, payToken, {
                gasLimit: BigNumber.from("800000"),
            });
    };

    const ethers_OkenV1RentMarketplace_rentItem = async (
        nftAddress,
        nftId,
        duration = BigNumber.from("3600").mul("24"),
        payToken = "0x0000000000000000000000000000000000000000" // zero address = ETH
    ) => {
        // get signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        // get contract
        const rentMarketplace = new ethers.Contract(
            OkenV1RentMarketplace_address,
            OkenV1RentMarketplace_abi,
            signer
        );

        // compute start and end
        const now = BigNumber.from(Math.round(new Date().getTime() / 1000));
        const start = BigNumber.from("0");
        const end = now.add(duration);

        // compute rent price
        const listing = await rentMarketplace.getListing(nftAddress, nftId);
        const rentPrice = end.sub(start).add(20).mul(listing.pricePerSecond);

        // rent item
        await rentMarketplace
            .connect(signer)
            .rentItem(nftAddress, nftId, start, end, payToken, {
                value: rentPrice,
                gasLimit: BigNumber.from("800000"),
            });
    };

    // if quickView is not triggered, do nothing
    if (!visible) return null;

    // QuickView template
    {
        // All NFTs
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-30 backdrop-blur-sm">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded">
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                <div className="sm:col-span-4 lg:col-span-5">
                                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={uri}
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7 h-full">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                        {name}
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-3"
                                    >
                                        <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <p className="text-xs font-medium text-gray-700 mb-2">
                                                Description
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {/* {description} */}
                                                We will implement the
                                                description feature soon.
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
