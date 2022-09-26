import React from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import "react-datepicker/dist/react-datepicker.css";

// icons
import { XIcon } from "@heroicons/react/outline";
import { FaEthereum } from "react-icons/fa";

import { OkenV1RentMarketplace_address } from "./deployments";
import { OkenV1RentMarketplace_abi } from "./deployments";

export const CardQuickView = ({
    nftAddress,
    name,
    uri,
    tokenId,
    visible,
    onClose,
    dashboardTab,
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
        rentItemForm_rentalPeriod: 1,
    });
    // const [listNow, setListNow] = React.useState(false);

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
    // if (dashboardTab === 2) {
    //     // All NFTs
    //     return (
    //         <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-30 backdrop-blur-sm">
    //             <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
    //                 <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
    //                     <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded">
    //                         <button
    //                             type="button"
    //                             className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
    //                             onClick={onClose}
    //                         >
    //                             <span className="sr-only">Close</span>
    //                             <XIcon className="h-6 w-6" aria-hidden="true" />
    //                         </button>
    //                         <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
    //                             <div className="sm:col-span-4 lg:col-span-5">
    //                                 <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
    //                                     <img
    //                                         src={uri}
    //                                         className="object-cover object-center"
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <div className="sm:col-span-8 lg:col-span-7 h-full">
    //                                 <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
    //                                     {name}
    //                                 </h2>
    //                                 <section
    //                                     aria-labelledby="information-heading"
    //                                     className="mt-3"
    //                                 >
    //                                     <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
    //                                         <p className="text-xs font-medium text-gray-700 mb-2">
    //                                             Description
    //                                         </p>
    //                                         <p className="text-sm text-gray-700">
    //                                             {/* {description} */}
    //                                             We will implement the
    //                                             description feature soon.
    //                                         </p>
    //                                     </div>

    //                                     <button
    //                                         // onClick={async () => {
    //                                         //     await ethers_OkenV1RentMarketplace_listItem(
    //                                         //         nftAddress,
    //                                         //         tokenId,
    //                                         //         formData.listItemForm_start,
    //                                         //         formData.listItemForm_end,
    //                                         //         BigNumber.from("1"),
    //                                         //         0x0000000000000000000000000000000000000000
    //                                         //     );
    //                                         // }}
    //                                         className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //                                     >
    //                                         List
    //                                     </button>
    //                                 </section>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    // QuickView to check lend NFTs
    if (dashboardTab === "My NFTs") {
        // Listed NFTs
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto  bg-opacity-30 backdrop-blur-sm">
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
                                            alt="NFT uri"
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

                                        <section>
                                            <div className="mb-5 mt-5">
                                                <div className="flex flex-row">
                                                    <label className=" text-sm font-medium text-gray-700">
                                                        Price Per Day
                                                    </label>
                                                    <FaEthereum />
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 0.05"
                                                    onChange={handleChange}
                                                    name="pricePerSecond"
                                                    value={
                                                        formData.pricePerSecond
                                                    }
                                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            {/* <label className=" text-sm font-medium text-gray-700">
                                                Start Date
                                            </label>
                                            <div>
                                                <input
                                                    type="date"
                                                    onChange={handleChange}
                                                    name="listItemForm_start"
                                                    value={
                                                        formData.listItemForm_start
                                                    }
                                                    className="w-full mb-6 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                                <button
                                                    onClick={setListNow(
                                                        (prevState) =>
                                                            !prevState
                                                    )}
                                                    className="w-full mb-6 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    list now
                                                </button>
                                            </div> */}

                                            <label className=" text-sm font-medium text-gray-700 mt-6">
                                                End Date (leave 0 if you want to
                                                rent forever).
                                            </label>
                                            <input
                                                type="date"
                                                onChange={handleChange}
                                                name="listItemForm_end"
                                                value={
                                                    formData.listItemForm_end
                                                }
                                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <button
                                                onClick={async () => {
                                                    await ethers_OkenV1RentMarketplace_listItem(
                                                        nftAddress,
                                                        tokenId,
                                                        BigNumber.from("0"),
                                                        YYYY_MM_DD_to_unix(
                                                            formData.listItemForm_end
                                                        ),
                                                        BigNumber.from(
                                                            formData.pricePerSecond
                                                        )
                                                    );
                                                    // if (formData.listNow) {
                                                    //     await ethers_OkenV1RentMarketplace_listItem(
                                                    //         nftAddress,
                                                    //         tokenId,
                                                    //         BigNumber.from("0"),
                                                    //         YYYY_MM_DD_to_unix(
                                                    //             formData.listItemForm_end
                                                    //         ),
                                                    //         BigNumber.from(
                                                    //             formData.pricePerSecond
                                                    //         )
                                                    //     );
                                                    // } else {
                                                    //     await ethers_OkenV1RentMarketplace_listItem(
                                                    //         nftAddress,
                                                    //         tokenId,
                                                    //         YYYY_MM_DD_to_unix(
                                                    //             formData.listItemForm_start
                                                    //         ),
                                                    //         YYYY_MM_DD_to_unix(
                                                    //             formData.listItemForm_end
                                                    //         ),
                                                    //         BigNumber.from(
                                                    //             formData.pricePerSecond
                                                    //         )
                                                    //     );
                                                    // }
                                                }}
                                                className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Lend
                                            </button>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // quickView to redeem NFTs
    // if (dashboardTab === 3) {
    //     // Redeem NFTs
    //     return (
    //         <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-30 backdrop-blur-sm">
    //             <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
    //                 <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
    //                     <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded">
    //                         <button
    //                             type="button"
    //                             className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
    //                             onClick={onClose}
    //                         >
    //                             <span className="sr-only">Close</span>
    //                             <XIcon className="h-6 w-6" aria-hidden="true" />
    //                         </button>
    //                         <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
    //                             <div className="sm:col-span-4 lg:col-span-5">
    //                                 <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
    //                                     <img
    //                                         src={uri}
    //                                         className="object-cover object-center"
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <div className="sm:col-span-8 lg:col-span-7 h-full">
    //                                 <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
    //                                     {name}
    //                                 </h2>
    //                                 <section
    //                                     aria-labelledby="information-heading"
    //                                     className="mt-3"
    //                                 >
    //                                     <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
    //                                         <p className="text-xs font-medium text-gray-700 mb-2">
    //                                             Description:
    //                                         </p>
    //                                         <p className="text-sm text-gray-700">
    //                                             {/* {description} */}
    //                                             We will implement the
    //                                             description feature soon.
    //                                         </p>
    //                                         <p className="text-xs font-medium text-gray-700 mb-2 mt-6">
    //                                             You currently listed this NFT
    //                                             for:
    //                                         </p>
    //                                         <p className="text-sm text-gray-700">
    //                                             5 ETH
    //                                         </p>
    //                                     </div>
    //                                     <button
    //                                         type="button"
    //                                         className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //                                     >
    //                                         Redeem
    //                                     </button>
    //                                 </section>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    // quickView to rent NFT
    if (dashboardTab === "Rent") {
        // Allows user to rent NFT
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
                                            alt="=NFT uri"
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
                                            <p className="text-xs font-medium text-gray-700 mb-2 mt-6">
                                                Rental price per day (in ETH)
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                5 ETH
                                            </p>
                                        </div>
                                        <div className="grid gap-y-8 pt-5 ">
                                            <div>
                                                <section
                                                // onSubmit={handleSubmit}
                                                >
                                                    <label className=" text-sm font-medium text-gray-700">
                                                        For how many days do you
                                                        want to rent this NFT?
                                                    </label>
                                                    <select
                                                        id="rentItemForm_rentalPeriod"
                                                        value={
                                                            formData.rentItemForm_rentalPeriod
                                                        }
                                                        onChange={handleChange}
                                                        name="rentItemForm_rentalPeriod"
                                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                        <option value="5">
                                                            5
                                                        </option>
                                                        <option value="6">
                                                            6
                                                        </option>
                                                        <option value="7">
                                                            7
                                                        </option>
                                                        <option value="8">
                                                            8
                                                        </option>
                                                        <option value="9">
                                                            9
                                                        </option>
                                                    </select>
                                                    <button
                                                        className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={async () =>
                                                            await ethers_OkenV1RentMarketplace_rentItem(
                                                                nftAddress,
                                                                tokenId,
                                                                BigNumber.from(
                                                                    "3600"
                                                                )
                                                                    .mul("24")
                                                                    .mul(
                                                                        formData.rentItemForm_rentalPeriod
                                                                    ),
                                                                "0x0000000000000000000000000000000000000000"
                                                            )
                                                        }
                                                    >
                                                        Rent
                                                    </button>
                                                </section>
                                            </div>
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
