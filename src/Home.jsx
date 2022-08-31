import React from "react";
import { AlertSuccessAuthentification } from "./alert-success-authentification";

export const Home = ({ isAuthenticated, Moralis }) => {
    const [allNFTs, setAllNFTs] = React.useState([{}]);
    const API_KEY = process.env.REACT_APP_API_KEY;

    // React.useEffect(() => {
    //     console.log(
    //         " -------------------- useEffect triggered --------------------"
    //     );
    //     async function getNFTs(chain) {
    //         const options = {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "X-API-Key": `${API_KEY}`,
    //             },
    //         };
    //         const contractAddress = "0x"; // ADD MARKETPLACE ADDRESS

    //         fetch(
    //             `https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`,
    //             options
    //         )
    //             .then((response) => response.json())
    //             .then((response) => getMetadata([...response.result]))
    //             .then((response) => setAllNFTs(response))
    //             .catch((err) => console.error(err));
    //     }

    //     getNFTs("Rinkeby");
    //     console.log(allNFTs.length);
    // }, []);

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

    async function rent() {
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

    if (!isAuthenticated) {
        return (
            <div className="ml-5 mr-5">
                <h1>
                    <b>Home Page</b>
                </h1>
                <div>
                    <h1>Welcome to Rentoken Rental Marketplace.</h1>
                    <br />
                    <br />
                    <br />
                    <p>
                        <b>
                            Please register by clicking on the "Authenticate"
                            button.
                        </b>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="ml-5 mr-5">
                <h1 className="font-bold text-5xl mb-10">Home Page</h1>
                <div>
                    <AlertSuccessAuthentification
                        title="Succesfully authentified !"
                        message="Welcome to Rentoken Rental Marketplace."
                    />
                </div>
            </div>
        </div>
    );
};
