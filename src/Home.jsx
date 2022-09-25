import React from "react";
import { Card } from "./Card";
import { useMoralisQuery } from "react-moralis";
import { CardQuickView } from "./CardQuickView";
import { HomeTabs } from "./HomeTabs";
import { View_CardQuickView } from "./View_CardQuickView";
export const Home = ({
    isAuthenticated,
    authenticate,
    account,
    isWeb3Enabled,
    enableWeb3,
    chain,
}) => {
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});
    const [dashboardTab, setDashboardTab] = React.useState(1);

    console.log(`isWeb3Enabled`, isWeb3Enabled);

    // Dashboard Tabs
    const toggleTab = (index) => {
        setDashboardTab(index);
    };

    const nftsListedNotRented = async (listedNfts, rentedNfts) => {
        let result = [];
        for (const listedNft of listedNfts) {
            const nftAddress = listedNft.attributes.nftAddress;
            const tokenId = listedNft.attributes.tokenId;
            let isRented = false;
            // linear search for now
            for (const rentedNft of rentedNfts) {
                if (
                    rentedNft.attributes.nftAddress == nftAddress &&
                    rentedNft.attributes.tokenId == tokenId
                ) {
                    isRented = true;
                }
            }
            result.push({
                nftAddress: nftAddress,
                tokenId: tokenId,
                owner: listedNft.attributes.owner,
                start: listedNft.attributes.start,
                end: listedNft.attributes.end,
                pricePerSecond: listedNft.attributes.pricePerSecond,
                payToken: listedNft.attributes.payToken,
            });
        }
        return result;
    };

    const { data: listedNfts, isFetching: fetchingListedNfts } =
        useMoralisQuery("RentMarketplace_ItemListed");
    const { data: rentedNfts, isFetching: fetchingRentedNfts } =
        useMoralisQuery("RentMarketplace_ItemRented");

    // CardQuickView functions
    const cardQuickView_handleOnClose = () => {
        setShowQuickView(false);
    };
    const cardQuickView_handleOnClick = () => {
        setShowQuickView(true);
    };

    if (!isAuthenticated) {
        return (
            <div>
                <div className="container">
                    <div className="row align-items-center g-5 py-5">
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold lh-1 mb-3">
                                Rentoken Rental Marketplace.
                            </h1>
                            <p className="lead">
                                An infrastructure company that provides a
                                solution for projects and individuals to rent
                                and lend NFTs with utility.
                            </p>
                        </div>
                        {/* Carousel */}
                        <div className="col-10 col-sm-8 col-lg-6">
                            <div className="block mx-auto">
                                {" "}
                                <div className="block-1">
                                    {" "}
                                    <img src="https://res.cloudinary.com/dydv1vpb2/image/upload/v1652870009/rentoken/bayc_lqmn2j.png" />{" "}
                                </div>{" "}
                                <div className="block-2"> </div>{" "}
                                <div className="block-3"> </div>{" "}
                                <div className="block-4"> </div>{" "}
                                <div className="block-5"> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light bg-gradient py-5 mb-5">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-md-6 themed-grid-col">
                                <h3 className="pt-5">
                                    The amazing world of NFT renting is here
                                </h3>
                            </div>
                            <div className="col-md-3 themed-grid-col">
                                <h4>Earn Extra</h4>
                                <p>
                                    List your NFTs on Rentoken and earn a
                                    passive income on your assets rather than
                                    leaving them in your wallet.
                                </p>
                            </div>

                            <div className="col-md-3 themed-grid-col">
                                <h4>Fully Secured</h4>
                                <p>
                                    Your NFTs are kept in a secured vault at
                                    Rentoken. Only the wrapped versions are
                                    rented out.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-indigo-700 h-screen ">
                    <div className="grid h-screen justify-center text-center sm:py-20 sm:px-6 lg:px-8">
                        <h2 className="text-3xl mt-20 font-bold tracking-tight text-white sm:text-4xl">
                            Web3 Authentification
                        </h2>
                        <p className="mt-4 text-lg text-indigo-200">
                            Please Authenticate by clicking ont the below
                            button.
                        </p>
                        <button
                            type="button"
                            className="mt-8 h-1/3 items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => authenticate()}
                        >
                            Authenticate
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="container">
                <div className="row align-items-center g-5 py-5">
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">
                            Rentoken Rental Marketplace.
                        </h1>
                        <p className="lead">
                            An infrastructure company that provides a solution
                            for projects and individuals to rent and lend NFTs
                            with utility.
                        </p>
                    </div>
                    {/* Carousel */}
                    <div className="col-10 col-sm-8 col-lg-6">
                        <div className="block mx-auto">
                            {" "}
                            <div className="block-1">
                                {" "}
                                <img src="https://res.cloudinary.com/dydv1vpb2/image/upload/v1652870009/rentoken/bayc_lqmn2j.png" />{" "}
                            </div>{" "}
                            <div className="block-2"> </div>{" "}
                            <div className="block-3"> </div>{" "}
                            <div className="block-4"> </div>{" "}
                            <div className="block-5"> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light bg-gradient py-5 mb-5">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-6 themed-grid-col">
                            <h3 className="pt-5">
                                The amazing world of NFT renting is here
                            </h3>
                        </div>
                        <div className="col-md-3 themed-grid-col">
                            <h4>Earn Extra</h4>
                            <p>
                                List your NFTs on Rentoken and earn a passive
                                income on your assets rather than leaving them
                                in your wallet.
                            </p>
                        </div>

                        <div className="col-md-3 themed-grid-col">
                            <h4>Fully Secured</h4>
                            <p>
                                Your NFTs are kept in a secured vault at
                                Rentoken. Only the wrapped versions are rented
                                out.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <HomeTabs tab={dashboardTab} handleClick={toggleTab} />

            <div className="bg-white">
                {dashboardTab === 1 && (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            NFTs Available to rent
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {listedNfts.length < 1 ? (
                                <h2>No NFTs available to rent yet.</h2>
                            ) : (
                                listedNfts.map((nft) => {
                                    const {
                                        nftAddress,
                                        pricePerSecond,
                                        start_decimal,
                                        end_decimal,
                                        owner,
                                        tokenId,
                                    } = nft.attributes;
                                    //uri, name, onClick, isListOrLendOrRedeemOrRent
                                    return (
                                        <Card
                                            isListOrLendOrRedeemOrRent={4}
                                            uri="https://source.unsplash.com/7MyzSlrUsVk/600x300"
                                            name="Rentoken_test nft"
                                            key={`${nftAddress}${tokenId}`}
                                            onClick={() => {
                                                cardQuickView_handleOnClick();
                                                setQuickViewNFTInfo({
                                                    name: "Rentoken_test nft",
                                                    uri: "https://source.unsplash.com/7MyzSlrUsVk/600x300",
                                                    nftAddress: nftAddress,
                                                    tokenId: tokenId,
                                                    owner: owner,
                                                });
                                            }}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {dashboardTab === 2 && (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            NFTs already rented
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {rentedNfts.length < 1 ? (
                                <h2>No NFTs rented yet.</h2>
                            ) : (
                                rentedNfts.map((nft) => {
                                    const {
                                        nftAddress,
                                        pricePerSecond,
                                        start_decimal,
                                        end_decimal,
                                        owner,
                                        tokenId,
                                        name,
                                    } = nft.attributes;
                                    //uri, name, onClick, isListOrLendOrRedeemOrRent
                                    return (
                                        <Card
                                            isListOrLendOrRedeemOrRent={3}
                                            uri="https://source.unsplash.com/7MyzSlrUsVk/600x300"
                                            name={name}
                                            key={`${nftAddress}${tokenId}`}
                                            onClick={() => {
                                                cardQuickView_handleOnClick();
                                                setQuickViewNFTInfo({
                                                    name: name,
                                                    uri: "https://source.unsplash.com/7MyzSlrUsVk/600x300",
                                                    nftAddress: nftAddress,
                                                    tokenId: tokenId,
                                                    owner: owner,
                                                });
                                            }}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            {dashboardTab === 1 && (
                <CardQuickView
                    nftAddress={quickViewNFTInfo.nftAddress}
                    name={quickViewNFTInfo.name}
                    uri={quickViewNFTInfo.uri}
                    tokenId={quickViewNFTInfo.tokenId}
                    onClose={cardQuickView_handleOnClose}
                    visible={showQuickView}
                    dashboardTab={4}
                />
            )}
            {dashboardTab === 2 && (
                <View_CardQuickView
                    nftAddress={quickViewNFTInfo.nftAddress}
                    name={quickViewNFTInfo.name}
                    uri={quickViewNFTInfo.uri}
                    tokenId={quickViewNFTInfo.tokenId}
                    onClose={cardQuickView_handleOnClose}
                    visible={showQuickView}
                    dashboardTab={4}
                />
            )}
        </div>
    );
};
