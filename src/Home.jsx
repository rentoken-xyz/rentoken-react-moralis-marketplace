import React from "react";
import { getNFTs } from "./helpers";
import { AlertSuccessAuthentification } from "./alert-success-authentification";
import NftUriStorage from "./ABIs/contracts/NftUriStorage.json";
import { Card } from "./Card";

export const Home = ({ isAuthenticated, Moralis, authenticate }) => {
    const [allHomeNFTs, setAllHomeNFTs] = React.useState([{}]);
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});

    // CardQuickView functions
    const cardQuickView_handleOnClose = () => {
        setShowQuickView(false);
    };
    const cardQuickView_handleOnClick = () => {
        setShowQuickView(true);
    };

    async function rent() {
        let options = {
            contractAddress: "0x", // ADD CONTRACT ADDRESS
            functionName: "", // ADD FUNCTION NAME
            abi: [{}], // ADD ABI
            params: {
                // ADD PARAMS
                param1: "",
                param2: "",
                param3: "",
            },
        };
        await Moralis.executeFunction(options);
    }

    if (!isAuthenticated) {
        return (
            // <div className="ml-5 mr-5">
            //     <h1>
            //         <b>Home Page</b>
            //     </h1>
            //     <div>
            //         <h1>Welcome to Rentoken Rental Marketplace.</h1>
            //         <br />
            //         <br />
            //         <br />
            //         <p>
            //             <b>
            //                 Please register by clicking on the "Authenticate"
            //                 button.
            //             </b>
            //         </p>
            //     </div>
            // </div>
            <div className="bg-indigo-700 flex h-screen align-middle  text-center">
                <div className="m-auto sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        <span className="block">Boost your productivity.</span>
                        <span className="block">Web3 Authentification</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        Please Authenticate by clicking ont the below button.
                    </p>

                    <button
                        type="button"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
                        onClick={() => authenticate()}
                    >
                        Authenticate
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="bg-white">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-indigo-600">
                                Lowering barriers to accessing opportunities
                                unlocked by NFTs.
                            </h2>
                            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Rentoken Rental Marketplace.
                            </p>
                            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                                An infrastructure startup that provides a
                                solution for projects and individuals to rent
                                and lend NFTs with utility
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                    <h2 className="text-lg font-semibold text-indigo-600">
                        Rent NFTs
                    </h2>
                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {allHomeNFTs.length <= 1 ? (
                            <h2>no nfts</h2>
                        ) : (
                            allHomeNFTs.map((res, i) => {
                                if (res.image.slice(0, 7) === "ipfs://") {
                                    return (
                                        <Card
                                            isListOrLendOrRedeemOrRent={4}
                                            image={res.image}
                                            name={res.name}
                                            description={res.description}
                                            key={i}
                                            onClick={() => {
                                                cardQuickView_handleOnClick();
                                                setQuickViewNFTInfo({
                                                    name: res.name,
                                                    description:
                                                        res.description,
                                                    image: res.image,
                                                });
                                            }}
                                        />
                                    );
                                }
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
