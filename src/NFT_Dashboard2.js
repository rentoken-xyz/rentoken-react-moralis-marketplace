import React from "react"


export const NFT_Dashboard2 = () => {
    const [allNFTs, setAllNFTs] = React.useState([{}])

    React.useEffect(() => {
        async function getNFTs(contractAddress, API_key, chain) {
            const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': `${API_key}`}};

            fetch(`https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`, options)
                .then(response => response.json())
                // .then(response => setAllNFTs([...response.result]))
                .then(response => getMetadata([...response.result]))
                .then(response => setAllNFTs(response))
                .catch(err => console.error(err));
        }
        getNFTs("0x66bfa029596B179883543a15DC527F6950E5649c", "If40O15C4BTv6WBvSSa9emfyaPokQcUsLzoJTZvsgYJ1rTZAHCC0gUPDoZFTkbSa", "Rinkeby")
    }, [])
    console.log(allNFTs)
    
    function getMetadata(props) {
        let array = []
        if (props.length>1){
            props.map((res, i) => {
                if (res.metadata) {
                    let convertedToJSON = JSON.parse(res.metadata)
                    array.push(convertedToJSON)
                }
            })
        }
        return array
    }

    return (
        <div>
            {allNFTs.map((res, i) => {
                if ((res.image.slice(0,7)) === "ipfs://") {
                    return(
                        <div key={i}>
                            (<h1><b>{res.name}</b></h1>
                            <img src={"https://ipfs.io/ipfs/" + res.image.substring(6)} />
                            <p>{res.description}</p>)
                        </div>
                    )
                }
            })}
        </div>
    )
}