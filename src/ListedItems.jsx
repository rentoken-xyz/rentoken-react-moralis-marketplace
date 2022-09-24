import React from "react";
import { useMoralisQuery, useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const ListedItems = () => {
    const { Moralis, isWeb3Enabled } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();

    console.log(`isWeb3Enabled`, isWeb3Enabled);

    const getListedItems = async (listedNftsQ) => {};

    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "RentMarketplace_ItemListed"
    );

    return <div>ListedItems</div>;
};

export default ListedItems;
