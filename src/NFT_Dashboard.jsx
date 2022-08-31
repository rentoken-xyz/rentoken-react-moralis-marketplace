import React from "react";
import { Card } from "./Card";
import { CardQuickView } from "./CardQuickView";
import { DummyCardQuickView } from "./DummyCardQuickView";

export const NFT_Dashboard = ({
    account,
    isWeb3Enabled,
    enableWeb3,
    Moralis,
}) => {
    const [allNFTs, setAllNFTs] = React.useState([{}]);
    const [showQuickView, setShowQuickView] = React.useState(false);

    /* *************** MORALIS API *************** */

    const API_KEY = process.env.REACT_APP_API_KEY;
    // const API_KEY = "If40O15C4BTv6WBvSSa9emfyaPokQcUsLzoJTZvsgYJ1rTZAHCC0gUPDoZFTkbSa"

    React.useEffect(() => {
        console.log(
            " -------------------- useEffect triggered --------------------"
        );
        if (isWeb3Enabled) {
            async function getNFTs(API_key, chain) {
                const options = {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "X-API-Key": `${API_key}`,
                    },
                };
                const contractAddress = account.toString();

                fetch(
                    `https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`,
                    options
                )
                    .then((response) => response.json())
                    .then((response) => getMetadata([...response.result]))
                    .then((response) => setAllNFTs(response))
                    .catch((err) => console.error(err));
            }
            getNFTs(API_KEY, "Rinkeby");
        } else {
            async function keepWeb3EnabledAfterRefresh() {
                await enableWeb3();
            }
            keepWeb3EnabledAfterRefresh();
        }
        console.log(allNFTs.length);
    }, [account]);

    console.log(`account:`, account);
    console.log(`isWeb3Enabled:`, isWeb3Enabled);

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

    /* *************** SMART-CONTRACT FUNCTIONS *************** */

    async function lend() {
        let options = {
            contractAddress: "0x", // ADD CONTRACT ADDRESS
            functionName: "", // ADD FUNCTION NAME
            abi: [{}], // ADD ABI
            params: {
                // ADD PARAMS
                param1: "",
                param2: "",
                param3: "",
            },
        };
        await Moralis.executeFunction(options);
    }

    const cardQuickView_handleOnClose = () => setShowQuickView(false);
    const cardQuickView_handleOnClick = () => setShowQuickView(true);

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">
                    NFT dashboard
                </h2>
                {/* <h2>{user}</h2> */}
                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {allNFTs.length <= 1 ? (
                        <h2>no nfts</h2>
                    ) : (
                        allNFTs.map((res, i) => {
                            if (res.image.slice(0, 7) === "ipfs://") {
                                return (
                                    <Card
                                        image={res.image}
                                        name={res.name}
                                        description={res.description}
                                        key={i}
                                        onClick={cardQuickView_handleOnClick}
                                    />
                                );
                            }
                        })
                    )}
                </div>
            </div>

            <DummyCardQuickView
                onClose={cardQuickView_handleOnClose}
                visible={showQuickView}
            />
            <CardQuickView
                onClose={cardQuickView_handleOnClose}
                visible={showQuickView}
            />
        </div>
    );
};
