const API_KEY = process.env.REACT_APP_API_KEY;

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
            console.log(response);
            return getMetadata([...response.result]);
        })
        .then((response) => setState(response))
        .catch((err) => console.error(err));

    // extract metadata (if there is) from NFT then convert from string to json
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
}
