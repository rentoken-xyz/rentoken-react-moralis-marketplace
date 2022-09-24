import React from "react";
import { Card } from "./Card";
import { CardQuickView } from "./CardQuickView";
import { DashboardTabs } from "./DashboardTabs";
import { getNFTs } from "./helpers";

export const NftDashboard = ({ account, isWeb3Enabled, enableWeb3, chain }) => {
  const [allNFTs, setAllNFTs] = React.useState([{}]);
  const [showQuickView, setShowQuickView] = React.useState(false);
  const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});
  const [dashboardTab, setDashboardTab] = React.useState(1);

  React.useEffect(() => {
    if (isWeb3Enabled) {
      getNFTs(account, chain.chainId, setAllNFTs);
    } else {
      keepWeb3EnabledAfterRefresh();
    }
  }, [account, chain]);

  // keep web3 enabled after website refresh
  async function keepWeb3EnabledAfterRefresh() {
    await enableWeb3();
  }

  // Dashboard Tabs
  const toggleTab = (index) => {
    setDashboardTab(index);
  };

<<<<<<< HEAD
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
              Please note that Rentoken Rental Marketplace only supports NFTs
              with ipfs hosted images at the moment.
            </p>
            <button
              // onClick={setShowQuickView((prevState) => !prevState)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
            >
              TEST BUTTON: quickView
            </button>
          </div>
        </div>
      </div>
      <DashboardTabs tab={dashboardTab} handleClick={toggleTab} />

      {
        // ------------- On Tab "All NFTs"
        dashboardTab === 1 && (
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
                        isListOrLendOrRedeemOrRent={dashboardTab}
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
                            address: res.address,
                            tokenId: res.tokenId,
                            owner: res.owner,
                          });
                        }}
                      />
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        )
      }
=======
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
                dashboardTab === 1 && (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            All NFTs with proper Metadata.
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {allNFTs.length <= 1 ? (
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

                                    return null;
                                })
                            )}
                        </div>
                    </div>
                )
            }
>>>>>>> 7cb2ee1537f484e88a89a2fb6d287be88fc2130f

      {
        // ------------- On Tab "Listed NFTs"
        dashboardTab === 2 && (
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-lg font-semibold text-indigo-600">
              NFT Listed on Rentoken Marketplace
            </h2>
          </div>
        )
      }

      {
        // ------------- On Tab "Rented NFTs"
        dashboardTab === 3 && (
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-lg font-semibold text-indigo-600">
              NFT Rented on Rentoken Marketplace
            </h2>
          </div>
        )
      }

<<<<<<< HEAD
      <CardQuickView
        address={quickViewNFTInfo.address}
        name={quickViewNFTInfo.name}
        description={quickViewNFTInfo.description}
        image={quickViewNFTInfo.image}
        tokenId={quickViewNFTInfo.tokenId}
        owner={quickViewNFTInfo.owner}
        onClose={cardQuickView_handleOnClose}
        visible={showQuickView}
        dashboardTab={dashboardTab}
      />
    </div>
  );
=======
            <CardQuickView
                nftAddress={quickViewNFTInfo.nftAddress}
                name={quickViewNFTInfo.name}
                uri={quickViewNFTInfo.uri}
                tokenId={quickViewNFTInfo.tokenId}
                owner={quickViewNFTInfo.owner}
                onClose={cardQuickView_handleOnClose}
                visible={showQuickView}
                dashboardTab={dashboardTab}
            />
        </div>
    );
>>>>>>> 7cb2ee1537f484e88a89a2fb6d287be88fc2130f
};
