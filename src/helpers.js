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
            return getNftInfo([...response.result]);
        })
        .then((response) => {
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
        return array;
    }
}
