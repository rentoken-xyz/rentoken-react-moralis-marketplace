const API_KEY = process.env.REACT_APP_API_KEY;
// import { useWeb3Contract } from "react-moralis";

// get metadata from NFTs with custom React setState function
export async function getNFTs(contractAddress, chainId, setState) {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-API-Key": `${API_KEY}`,
        },
    };
    let address = contractAddress.toString();
    fetch(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chainId}&format=decimal`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            // console.log("####################");
            // console.log(response.result.length);

            return getNftInfo([...response.result]);
        })
        .then((response) => {
            console.log("console.log(response);");
            console.log(response);
            setState(response);
        })
        .catch((err) => console.error(err));

    // extract metadata (if there is) from NFT then convert from string to json
    function getNftInfo(props) {
        // console.log(props);
        let array = [];
        if (props.length > 1) {
            props.map((res, i) => {
                array.push({
                    nftAddress: res.token_address,
                    tokenId: res.token_id,
                    name: res.name,
                    owner: res.owner_of,
                    uri: res.token_uri,
                });
            });
        }
        return array;
    }
    function getNftInfo2(props) {
        let array = [];
        if (props.length > 1) {
            props.map((res, i) => {
                if (
                    res.metadata &&
                    res.token_address &&
                    res.token_id &&
                    res.owner_of
                ) {
                    let convertedToJSON = JSON.parse(res.metadata);
                    convertedToJSON = {
                        ...convertedToJSON,
                        address: res.token_address,
                        tokenId: res.token_id,
                        owner: res.owner_of,
                    };
                    array.push(convertedToJSON);
                }
            });
        }
        // console.log(`------------- array`, array);
        return array;
    }
}

// export const listOptions = {
//     // 0xe82D3B87100B22C51D4F3d2127823fc7CC267F3e
//     const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction();

//     const options = {
//         abi: usdcEthPoolAbi,
//         contractAddress: usdcEthPoolAddress,
//         functionName: "observe",
//         params: {
//           secondsAgos: [0, 10],
//         },
//       }

// }

// ------------------------------------------ ------------------------------------------
//  // const listItem = (tokenId, address) => {
//     const { data, error, runContractFunction, isFetching, isLoading } =
//     // smart contract execution
//     useWeb3Contract({
//         // contractAddress: RentableNFTRentMarketplaceADDRESS,
//         contractAddress: "0xe82D3B87100B22C51D4F3d2127823fc7CC267F3e", // TESTING HARDCODED CONTRACT ADDRESS
//         functionName: "listItem",
//         abi: {
//             inputs: [
//                 {
//                     internalType: "address",
//                     name: "nftAddress",
//                     type: "address",
//                 },
//                 {
//                     internalType: "uint256",
//                     name: "tokenId",
//                     type: "uint256",
//                 },
//                 {
//                     internalType: "uint64",
//                     name: "expires",
//                     type: "uint64",
//                 },
//                 {
//                     internalType: "uint256",
//                     name: "pricePerSecond",
//                     type: "uint256",
//                 },
//                 {
//                     internalType: "address",
//                     name: "payToken",
//                     type: "address",
//                 },
//             ],
//             name: "listItem",
//             outputs: [],
//             stateMutability: "nonpayable",
//             type: "function",
//         },
//         params: {
//             // ADD PARAMS
//             nftAddress: "0xd7604195e9b950887785540744775a40e6f12659",
//             tokenId: "3",
//             expires: "1662942360",
//             pricePerSecond: "100000000000000000000",
//             payToken: "address(0)",
//         },
//     });
// };

// const lendItem = (tokenId, address) => {
// const { data, error, runContractFunction, isFetching, isLoading } =
//     // smart contract execution
//     useWeb3Contract({
//         // contractAddress: RentableNFTRentMarketplaceADDRESS,
//         contractAddress: "0xe82D3B87100B22C51D4F3d2127823fc7CC267F3e", // TESTING HARDCODED CONTRACT ADDRESS
//         functionName: "listItem",
//         abi: {
//             inputs: [
//                 {
//                     internalType: "address",
//                     name: "nftAddress",
//                     type: "address",
//                 },
//                 {
//                     internalType: "uint256",
//                     name: "tokenId",
//                     type: "uint256",
//                 },
//                 {
//                     internalType: "uint64",
//                     name: "expires",
//                     type: "uint64",
//                 },
//                 {
//                     internalType: "uint256",
//                     name: "pricePerSecond",
//                     type: "uint256",
//                 },
//                 {
//                     internalType: "address",
//                     name: "payToken",
//                     type: "address",
//                 },
//             ],
//             name: "listItem",
//             outputs: [],
//             stateMutability: "nonpayable",
//             type: "function",
//         },
//         params: {
//             // ADD PARAMS
//             nftAddress: "0xd7604195e9b950887785540744775a40e6f12659",
//             tokenId: "3",
//             expires: "1662942360",
//             pricePerSecond: "100000000000000000000",
//             payToken: "address(0)",
//         },
//     });
// };
