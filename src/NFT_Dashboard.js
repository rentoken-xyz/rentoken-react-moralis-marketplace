import { Cards } from './Cards';
import { useMoralisWeb3Api } from "react-moralis";

export const NFT_Dashboard = () => {

  // initialise stuff
  const Web3Api = useMoralisWeb3Api();
  let allNFTs =[];

  // secondary functions
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // main function
  // async function loadNFTMetadata(loadingTime) {
  //   const options = {
  //     address: "0xac70be9067a18681934a25e3493a2e80087b5286",
  //     chain: "rinkeby",
  //   };
  //   let NFTs = await Web3Api.token.getAllTokenIds(options);
  //   let NFTRes = NFTs.result
  //   for (let i = 0; i < NFTRes.length; i++) {
  //       let nft = NFTRes[i];
  //       let metadata = JSON.parse(nft.metadata);

  //       allNFTs.push({name: metadata.name, image: metadata.image, description: metadata.description});
        
  //     }
  //   await sleep(loadingTime)
  //   console.log('avant')
  // };
  async function loadNFTMetadata() {
    const options = {
      address: "0xac70be9067a18681934a25e3493a2e80087b5286",
      chain: "rinkeby",
    };
    let NFTs = await Web3Api.token.getAllTokenIds(options);
    let NFTRes = NFTs.result
    for (let i = 0; i < NFTRes.length; i++) {
        let nft = NFTRes[i];
        let metadata = JSON.parse(nft.metadata);

        allNFTs.push({name: metadata.name, image: metadata.image, description: metadata.description});
        
      }
    console.log('avant')
  };

  loadNFTMetadata()
  // loadNFTMetadata(5000)
  console.log('donc...')
  console.log(allNFTs)

  return (
    <div className="ml-5 mr-5">
    <h1 className='font-bold text-5xl mb-10'>NFT Dashboard</h1> 

    {/* <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <div className="relative">
            <div className='relative w-full h-72 rounded-lg overflow-hidden'>
              <div className="w-full h-full object-center object-cover">
                <div id="renderNFTs" className='text-sky-400'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    
    <Cards table={allNFTs}/>
  </div>
  )
};