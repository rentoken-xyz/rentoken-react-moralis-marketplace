import React from "react";

export const DashboardTabs = ({ tab, handleClick }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="mt-10">
            <div className="flex justify-center gap-10">
                <div
                    className={classNames(
                        tab === 1
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl"
                    )}
                    onClick={() => handleClick(1)}
                >
                    All NFTs
                </div>
                <div
                    className={classNames(
                        tab === 2
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl"
                    )}
                    onClick={() => handleClick(2)}
                >
                    Listed NFTs
                </div>
                <div
                    className={classNames(
                        tab === 3
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl"
                    )}
                    onClick={() => handleClick(3)}
                >
                    Rented NFTs
                </div>
            </div>
        </div>
    );
};
