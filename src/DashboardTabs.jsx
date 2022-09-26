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
                        tab === "My NFTs"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl"
                    )}
                    onClick={() => handleClick("My NFTs")}
                >
                    My NFTs
                </div>
                <div
                    className={classNames(
                        tab === "Liked NFTs"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xl"
                    )}
                    onClick={() => handleClick("Liked NFTs")}
                >
                    Liked NFTs
                </div>
            </div>
        </div>
    );
};
