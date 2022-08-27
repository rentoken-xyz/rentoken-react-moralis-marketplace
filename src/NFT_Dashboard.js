import React from "react"

export const NFT_Dashboard = () => {
    const [allNFTs, setAllNFTs] = React.useState([{}])
    const [allMetadata, setAllMetadata] = React.useState([{}])

    React.useEffect(() => {
        async function getNFTs(contractAddress, API_key, chain) {
            const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': `${API_key}`}};

            fetch(`https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`, options)
                .then(response => response.json())
                .then(response => setAllNFTs([...response.result]))
                .catch(err => console.error(err));
        }
        getNFTs("0x66bfa029596B179883543a15DC527F6950E5649c", "If40O15C4BTv6WBvSSa9emfyaPokQcUsLzoJTZvsgYJ1rTZAHCC0gUPDoZFTkbSa", "Rinkeby")
    }, [])
    console.log(allNFTs)
    
    function getMetadata(props) {
        if (props.length>1){
            props.map((res, i) => {
                if (res.metadata) {
                    let convertedToJSON = JSON.parse(res.metadata)
                    // setAllMetadata([{
                    //     "image": convertedToJSON
                    // }])
                }
            })
        }
    }
    getMetadata(allNFTs)

    // function getNFTImage() {
    //     const url = allNFTs
    // }

    // function getMemeImage() {
    //     const randomNumber = Math.floor(Math.random() * allMemes.length)
    //     const url = allMemes[randomNumber].url
    //     setMeme(prevMeme => ({
    //         ...prevMeme,
    //         randomImage: url
    //     }))
    // }

    return (
        <div>
            {allNFTs.map((res, i) => {
                return(
                    <div key={i}>
                        <p>an nft</p>
                        {/* {(allNFTs.length>1) && getMetadata(res.metadata)} */}
                        {/* {(res.metadata) ? (res.metadata) : <div></div>} */}
                        {res.metadata}
                    </div>
                )
            })}
        </div>
    )
}