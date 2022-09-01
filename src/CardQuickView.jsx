import React from "react";
import { XIcon } from "@heroicons/react/outline";

export const CardQuickView = ({
    visible,
    onClose,
    name,
    description,
    image,
    dashboardTab,
}) => {
    const [formData, setFormData] = React.useState({
        rentalPeriod: "",
        pricePerDay: "",
        deadline: "",
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

    function handleSubmit(event) {
        event.preventDefault();
        // submitToApi(formData)
        console.log(formData);
    }

    if (!visible) return null;

    if (dashboardTab === 1) {
        // All NFTs
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm">
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
                                            src={
                                                "https://ipfs.io/ipfs/" +
                                                image.substring(6)
                                            }
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                        {name}
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-3"
                                    >
                                        <h3
                                            id="information-heading"
                                            className="sr-only"
                                        >
                                            Product information
                                        </h3>
                                        <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <p className="text-xs font-medium text-gray-700 mb-2">
                                                Description
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {description}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            List
                                        </button>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (dashboardTab === 2) {
        // Listed NFTs
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm">
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
                                            src={
                                                "https://ipfs.io/ipfs/" +
                                                image.substring(6)
                                            }
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                        {name}
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-3"
                                    >
                                        <h3
                                            id="information-heading"
                                            className="sr-only"
                                        >
                                            Product information
                                        </h3>
                                        <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <p className="text-xs font-medium text-gray-700 mb-2">
                                                Description
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {description}
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-5 mt-5">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Price Per Day (in ETH)
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 0.05"
                                                    onChange={handleChange}
                                                    name="pricePerDay"
                                                    value={formData.pricePerDay}
                                                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <label className="block text-sm font-medium text-gray-700">
                                                Your NFT will be rentable until
                                                the chosen date
                                            </label>
                                            <input
                                                type="date"
                                                onChange={handleChange}
                                                name="deadline"
                                                value={formData.deadline}
                                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <button className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                Lend
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (dashboardTab === 3) {
        // Redeem NFTs
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm">
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
                                            src={
                                                "https://ipfs.io/ipfs/" +
                                                image.substring(6)
                                            }
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                        {name}
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-3"
                                    >
                                        <h3
                                            id="information-heading"
                                            className="sr-only"
                                        >
                                            Product information
                                        </h3>
                                        <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <p className="text-xs font-medium text-gray-700 mb-2">
                                                Description:
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {description}
                                            </p>
                                            <p className="text-xs font-medium text-gray-700 mb-2 mt-6">
                                                You currently listed this NFT
                                                for:
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                5 ETH
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Redeem
                                        </button>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (dashboardTab === 4) {
        // Allows user to rent NFT
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm">
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
                                            src={
                                                "https://ipfs.io/ipfs/" +
                                                image.substring(6)
                                            }
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                        {name}
                                    </h2>
                                    <section
                                        aria-labelledby="information-heading"
                                        className="mt-3"
                                    >
                                        <h3
                                            id="information-heading"
                                            className="sr-only"
                                        >
                                            Product information
                                        </h3>
                                        <div className="mt-6 w-full rounded-md border border-gray-100 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                            <p className="text-xs font-medium text-gray-700 mb-2">
                                                Description
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {description}
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
                                                <form onSubmit={handleSubmit}>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        For how many days do you
                                                        want to rent this NFT?
                                                    </label>
                                                    <select
                                                        id="rentalPeriod"
                                                        value={
                                                            formData.favColor
                                                        }
                                                        onChange={handleChange}
                                                        name="rentalPeriod"
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
                                                    <button className="mt-10 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-16 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        Rent
                                                    </button>
                                                </form>
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
