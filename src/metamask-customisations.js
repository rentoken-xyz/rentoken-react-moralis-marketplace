import { useMoralis } from "react-moralis";

export const MetamaskCustomisations = () => {
    const { Moralis } = useMoralis();
    Moralis.authenticate({signingMessage:"My custom message"})
}