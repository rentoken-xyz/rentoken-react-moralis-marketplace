import React from "react";
import { XIcon } from "@heroicons/react/outline";

export const CardQuickView = ({
    visible,
    onClose,
    name,
    description,
    image,
}) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
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

                                    <p className="text-2xl text-gray-900">
                                        $5 / day
                                    </p>
                                    <div className="mt-6">
                                        <h4 className="sr-only">Description</h4>

                                        <p className="text-sm text-gray-700">
                                            {description}
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
};
