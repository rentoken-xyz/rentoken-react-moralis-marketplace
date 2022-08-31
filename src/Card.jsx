import React from "react";

export const Card = ({ image, name, description, onClick }) => {
    return (
        <div>
            <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                    <img src={"https://ipfs.io/ipfs/" + image.substring(6)} />
                </div>
                <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        {name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                        Rental price: 5$
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <button
                    className="relative flex w-full bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                    onClick={onClick}
                >
                    Lend
                </button>
            </div>
        </div>
    );
};
