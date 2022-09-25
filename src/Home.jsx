import React from "react";
import { Card } from "./Card";
import { useMoralisQuery } from "react-moralis";
export const Home = ({
    isAuthenticated,
    authenticate,
    account,
    isWeb3Enabled,
    enableWeb3,
    chain,
}) => {
    const [allListedNFTs, setAllListedNFTs] = React.useState([{}]);
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [quickViewNFTInfo, setQuickViewNFTInfo] = React.useState({});
    console.log(`isWeb3Enabled`, isWeb3Enabled);
    // React.useEffect(() => {
    //     if (isWeb3Enabled) {
    //         console.log(allListedNFTs.length);
    //         // getAllListedNFTs();
    //     } else {
    //         keepWeb3EnabledAfterRefresh();
    //     }
    // }, [account, chain, allListedNFTs.length]);

    // // keep web3 enabled after website refresh
    async function keepWeb3EnabledAfterRefresh() {
        await enableWeb3();
    }

    async function getAllListedNFTs() {
        await nftsListedNotRented(listedNfts, rentedNfts).then((res) => {
            setAllListedNFTs(res);
        });
    }
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

    nftsListedNotRented(listedNfts, rentedNfts).then((res) => {
        console.log(res);
        const initNftsListedNotRented = res;
    });

    // CardQuickView functions
    const cardQuickView_handleOnClose = () => {
        setShowQuickView(false);
    };
    const cardQuickView_handleOnClick = () => {
        setShowQuickView(true);
    };

    console.log(allListedNFTs);

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
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
                    <h2 className="text-lg font-semibold text-indigo-600">
                        Rent NFTs
                    </h2>
                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {allListedNFTs === undefined ||
                        allListedNFTs.length <= 2 ? (
                            <h2>no nfts</h2>
                        ) : (
                            allListedNFTs.map((res, i) => {
                                return (
                                    <Card
                                        isListOrLendOrRedeemOrRent={1}
                                        uri="https://source.unsplash.com/7MyzSlrUsVk/600x300"
                                        name="Rentoken_test nft"
                                        key={i}
                                        onClick={() => {
                                            cardQuickView_handleOnClick();
                                            setQuickViewNFTInfo({
                                                name: "Rentoken_test nft",
                                                uri: "https://source.unsplash.com/7MyzSlrUsVk/600x300",
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
            </div>
        </div>
    );
};
