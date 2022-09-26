import React from "react";
import { Card } from "./Card";
import { CardQuickView } from "./CardQuickView";
import { DashboardTabs } from "./DashboardTabs";
import { getNFTs } from "./helpers";

export const NftDashboard = ({ account, isWeb3Enabled, enableWeb3, chain }) => {
    const [allNFTs, setAllNFTs] = React.useState([{}]);
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});
    const [dashboardTab, setDashboardTab] = React.useState("My NFTs");

    React.useEffect(() => {
        if (isWeb3Enabled) {
            getNFTs(account, chain.chainId, setAllNFTs);
        } else {
            keepWeb3EnabledAfterRefresh();
        }
    }, [account, chain, allNFTs.length]);

    // keep web3 enabled after website refresh
    async function keepWeb3EnabledAfterRefresh() {
        await enableWeb3();
    }

    // Dashboard Tabs
    const toggleTab = (tabName) => {
        setDashboardTab(tabName);
    };

    // CardQuickView functions
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

            {
                // ------------- On Tab "All NFTs"
                dashboardTab === "My NFTs" && (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            My NFTs
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {allNFTs.length < 1 ? (
                                <h2>no nfts</h2>
                            ) : (
                                allNFTs.map((res, i) => {
                                    return (
                                        <Card
                                            isListOrLendOrRedeemOrRent={
                                                dashboardTab
                                            }
                                            uri={res.uri}
                                            name={res.name}
                                            key={i}
                                            onClick={() => {
                                                cardQuickView_handleOnClick();
                                                setQuickViewNFTInfo({
                                                    name: res.name,
                                                    uri: res.uri,
                                                    nftAddress: res.nftAddress,
                                                    tokenId: res.tokenId,
                                                    owner: res.owner,
                                                });
                                            }}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )
            }

            {
                // ------------- On Tab "Listed NFTs"
                dashboardTab === "Liked NFTs" && (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            NFT Listed on Rentoken Marketplace
                        </h2>
                    </div>
                )
            }

            <CardQuickView
                nftAddress={quickViewNFTInfo.nftAddress}
                name={quickViewNFTInfo.name}
                uri={quickViewNFTInfo.uri}
                tokenId={quickViewNFTInfo.tokenId}
                onClose={cardQuickView_handleOnClose}
                visible={showQuickView}
                dashboardTab={dashboardTab}
            />
        </div>
    );
};
