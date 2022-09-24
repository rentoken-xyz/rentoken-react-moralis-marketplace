import {
  useMoralisQuery,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { BigNumber, ethers } from "ethers";
import {
  OkenV1RentMarketplace_address,
  OkenV1RentMarketplace_abi,
} from "./deployments";

export const Testing = () => {
  const { Moralis, isWeb3Enabled } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  console.log(`isWeb3Enabled`, isWeb3Enabled);

  const ethers_OkenV1RentMarketplace_listItem = async (
    nftAddress,
    nftId,
    start = BigNumber.from("0"), // if start == 0, start is set to `block.timestamp`
    end = BigNumber.from("2").pow("64").sub(1), // max uint64
    pricePerSecond = BigNumber.from("1"), // cannot be zero
    payToken = "0x0000000000000000000000000000000000000000" // set to zero address for now (ETH)
  ) => {
    // get signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // get contract
    const rentMarketplace = new ethers.Contract(
      OkenV1RentMarketplace_address,
      OkenV1RentMarketplace_abi,
      signer
    );

    // list item
    await rentMarketplace
      .connect(signer)
      .listItem(nftAddress, nftId, start, end, pricePerSecond, payToken, {
        gasLimit: BigNumber.from("800000"),
      });
  };

  const ethers_OkenV1RentMarketplace_rentItem = async (
    nftAddress,
    nftId,
    duration = BigNumber.from("3600").mul("24"), // default: 1 day
    payToken = "0x0000000000000000000000000000000000000000" // zero address = ETH
  ) => {
    // get signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // get contract
    const rentMarketplace = new ethers.Contract(
      OkenV1RentMarketplace_address,
      OkenV1RentMarketplace_abi,
      signer
    );

    // compute start and end
    const now = BigNumber.from(Math.round(new Date().getTime() / 1000));
    const start = BigNumber.from("0");
    const end = now.add(duration);

    // compute rent price
    const listing = await rentMarketplace
      .connect(signer)
      .getListing(nftAddress, nftId);
    const rentPrice = (duration + 60) * listing.pricePerSecond;

    // rent item
    await rentMarketplace
      .connect(signer)
      .rentItem(nftAddress, nftId, start, end, payToken, {
        value: rentPrice,
        gasLimit: BigNumber.from("800000"),
      });
  };

  const isListingExpired = (end) => {
    if (end < Math.round(new Date().getTime() / 1000)) {
      return true;
    }
    return false;
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

  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    "RentMarketplace_ItemListed"
  );
  const { data: rentedNfts, isFetching: fetchingRentedNfts } = useMoralisQuery(
    "RentMarketplace_ItemRented"
  );

  nftsListedNotRented(listedNfts, rentedNfts).then((res) => console.log(res));

  return (
    <div>
      <div className="flex-column content-center">
        <h1 className="text-center">testing page</h1>
        <div className="grid place-items-center">
          <button
            className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              await ethers_OkenV1RentMarketplace_listItem(
                "0x2c758aae5827b743bc4a423c0e7f260203d30c16",
                BigNumber.from("0"),
                BigNumber.from("0"),
                BigNumber.from(2).pow(64).sub(1),
                BigNumber.from("2"),
                "0x0000000000000000000000000000000000000000"
              );
              console.log("works");
            }}
          >
            List Item
          </button>
          <br />
          <button
            className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              await ethers_OkenV1RentMarketplace_rentItem(
                "0x2c758aae5827b743bc4a423c0e7f260203d30c16",
                BigNumber.from("0")
              );
              console.log("works");
            }}
          >
            Rent Item
          </button>
        </div>
      </div>
    </div>
  );
};
