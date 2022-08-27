import React from "react"
import { useMoralis } from "react-moralis";

export const NFT_Dashboard2 = () => {
    const [allNFTs, setAllNFTs] = React.useState([{}])
    const { account, user } = useMoralis();


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
        console.log('useEffect triggered')
    }, [user])


    console.log(`user:`)
    console.log(user)
    console.log(`account:`)
    console.log(account)
    
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
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">NFT dashboard</h2>
                {/* <h2>{user}</h2> */}
                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {
                        (allNFTs.length > 1) && (
                            allNFTs.map((res, i) => {
                                if ((res.image.slice(0,7)) === "ipfs://") {
                                    return(
                                        <div key={i}>
                                            <div className="relative">
                                                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={"https://ipfs.io/ipfs/" + res.image.substring(6)} 
                                                    />
                                                </div>
                                                <div className="relative mt-4">
                                                    <h3 className="text-sm font-medium text-gray-900">{res.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{res.description}</p>
                                                </div>
                                                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                                    <div
                                                        aria-hidden="true"
                                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                                    />
                                                    <p className="relative text-lg font-semibold text-white">Rental price: 5$</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}