import React from "react";
import { Card } from "./Card";
import { CardQuickView } from "./CardQuickView";
import { DashboardTabs } from "./DashboardTabs";

export const NFT_Dashboard = ({
    account,
    isWeb3Enabled,
    enableWeb3,
    Moralis,
}) => {
    const [allNFTs, setAllNFTs] = React.useState([{}]);
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});
    const [dashboardTab, setDashboardTab] = React.useState(1);

    const toggleTab = (index) => {
        setDashboardTab(index);
    };

    /* *************** MORALIS API *************** */

    const API_KEY = process.env.REACT_APP_API_KEY;
    // const API_KEY = "If40O15C4BTv6WBvSSa9emfyaPokQcUsLzoJTZvsgYJ1rTZAHCC0gUPDoZFTkbSa"

    React.useEffect(() => {
        if (isWeb3Enabled) {
            async function getNFTs(API_key, chain) {
                const options = {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "X-API-Key": `${API_key}`,
                    },
                };
                const contractAddress = account.toString();

                fetch(
                    `https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`,
                    options
                )
                    .then((response) => response.json())
                    .then((response) => getMetadata([...response.result]))
                    .then((response) => setAllNFTs(response))
                    .catch((err) => console.error(err));
            }
            getNFTs(API_KEY, "Rinkeby");
        } else {
            async function keepWeb3EnabledAfterRefresh() {
                await enableWeb3();
            }
            keepWeb3EnabledAfterRefresh();
        }
    }, [account]);

    function getMetadata(props) {
        let array = [];
        if (props.length > 1) {
            props.map((res, i) => {
                if (res.metadata) {
                    let convertedToJSON = JSON.parse(res.metadata);
                    array.push(convertedToJSON);
                }
            });
        }
        return array;
    }

    /* *************** SMART-CONTRACT FUNCTIONS *************** */

    async function lend() {
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

    const cardQuickView_handleOnClose = () => {
        setShowQuickView(false);
    };
    const cardQuickView_handleOnClick = () => {
        setShowQuickView(true);
    };

    return (
        <div className="bg-white">
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            Access restricted to your metamask wallet.
                        </h2>
                        <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            NFT Dashboard.
                        </p>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                            Please note that Rentoken Rental Marketplace only
                            supports NFTs with ipfs hosted images at the moment.
                        </p>
                    </div>
                </div>
            </div>
            <DashboardTabs tab={dashboardTab} handleClick={toggleTab} />
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                <h2 className="text-lg font-semibold text-indigo-600">
                    All NFTs with proper Metadata.
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {allNFTs.length <= 1 ? (
                        <h2>no nfts</h2>
                    ) : (
                        allNFTs.map((res, i) => {
                            if (res.image.slice(0, 7) === "ipfs://") {
                                return (
                                    <Card
                                        isListOrLendOrRedeemOrRent={
                                            dashboardTab
                                        }
                                        image={res.image}
                                        name={res.name}
                                        description={res.description}
                                        key={i}
                                        onClick={() => {
                                            cardQuickView_handleOnClick();
                                            setQuickViewNFTInfo({
                                                name: res.name,
                                                description: res.description,
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
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-indigo-600">
                    NFT Listed on Rentoken Marketplace
                </h2>
            </div>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-indigo-600">
                    NFT Rented on Rentoken Marketplace
                </h2>
            </div>
            <CardQuickView
                onClose={cardQuickView_handleOnClose}
                visible={showQuickView}
                name={quickViewNFTInfo.name}
                description={quickViewNFTInfo.description}
                image={quickViewNFTInfo.image}
                dashboardTab={dashboardTab}
            />
        </div>
    );
};
