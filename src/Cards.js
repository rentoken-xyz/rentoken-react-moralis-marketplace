import React from "react";
import { useMoralisWeb3Api } from "react-moralis";


export const Cards = () => {
  console.log('start')
  const Web3Api = useMoralisWeb3Api();

  const fetchAllTokenIds = async () => {
    const options = {
      address: "0xac70be9067a18681934a25e3493a2e80087b5286",
      chain: "rinkeby",
    };
    let NFTs = await Web3Api.token.getAllTokenIds(options);
  };

  async function myMetadataFunction() {
    let products = []
    const options = {
      address: "0xac70be9067a18681934a25e3493a2e80087b5286",
      chain: "rinkeby",
    };
    let NFTs = await Web3Api.token.getAllTokenIds(options);
    let NFTRes = NFTs.result
    return new Promise((resolve, reject) => {
      for (let i = 0; i < NFTRes.length; i++) {
        let nft = NFTRes[i];
        // let id = nft.token_id
        let metadata = JSON.parse(nft.metadata);
        products.push({name: metadata.name, image: metadata.image, description: metadata.description});
      }
      resolve(products);
    })
  };

  async function renderInventory(){
    const options = {
      address: "0xac70be9067a18681934a25e3493a2e80087b5286",
      chain: "rinkeby",
    };

    const parent = document.getElementById("renderNFTs")

    let products = myMetadataFunction();
    products
        .then(function(res) {
            for (let i = 0; i < res.length; i++) {
            let nft = res[i];
            let htmlString = `<img src="${nft.image}" className="w-full h-full object-center object-cover">
                <p>${nft.name}</p>                
            `
            let col = document.createElement("div");
            col.innerHTML = htmlString;
            if (parent != null) parent.append(col);
            };
        })
      
  };

  // GUIDE ON HOW TO CALL PRODUCTS
  // let products = myMetadataFunction();
  // products.then(function(res) {
  //   for (let i = 0; i < res.length; i++) {
  //     console.log(res[i])
  //   }
  // })
  

  renderInventory()
}