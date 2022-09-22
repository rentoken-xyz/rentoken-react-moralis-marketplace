import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
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
    duration = BigNumber.from("3600").from("24"),
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
    const listing = await rentMarketplace.getListing(nftAddress, nftId);
    const rentPrice = end.sub(start).add(20).mul(listing.pricePerSecond);

    // list item
    await rentMarketplace
      .connect(signer)
      .rentItem(nftAddress, nftId, start, end, payToken, {
        value: rentPrice,
        gasLimit: BigNumber.from("800000"),
      });
  };

  return (
    <div>
      <div className="flex-column content-center">
        <h1 className="text-center">testing page</h1>
        <div className="grid place-items-center">
          <button
            className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              await ethers_OkenV1RentMarketplace_listItem(
                "0xadbfb54ccb335cdf398fdfaf1dae186505b58d6e",
                BigNumber.from("0"),
                BigNumber.from("0"),
                BigNumber.from(2).pow(64).sub(1),
                ethers.utils.parseEther("0.0000000869373974"),
                "0x0000000000000000000000000000000000000000"
              );
              console.log("works");
            }}
          >
            List Item
          </button>
        </div>
      </div>
    </div>
  );
};
