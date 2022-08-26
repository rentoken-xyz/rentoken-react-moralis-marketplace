import React from "react"

export const NFT_Dashboard2 = () => {
    const [allNFTs, setAllNFTs] = React.useState({
        image:"https://yierjn0f1z5m.usemoralis.com/yellow.jpeg",
        desription:"Rentoken Logo in yellow",
        name:"Rentoken x Yellow"
    })

    
    React.useEffect(() => {
        async function getNFTs(contractAddress, API_key, chain) {
            const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': `${API_key}`}};

            fetch(`https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`, options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
        getNFTs("0x66bfa029596B179883543a15DC527F6950E5649c", "If40O15C4BTv6WBvSSa9emfyaPokQcUsLzoJTZvsgYJ1rTZAHCC0gUPDoZFTkbSa", "Rinkeby")
    }, [])
    // console.log(allNFTs)

    function getNftImage() {
        const nft = allNFTs[0]
        // console.log(nft)
    }

    function handleClick() {
        console.log("click")
    }

    getNftImage()
    return (
        <div>
            <button onClick={handleClick}>test button</button>
        </div>
    )
}