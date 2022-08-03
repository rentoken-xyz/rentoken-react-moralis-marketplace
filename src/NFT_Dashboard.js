import { Cards } from './Cards';

export const NFT_Dashboard = () => {
  return (
    <div className="ml-5 mr-5">
    <h1 className='font-bold text-5xl mb-10'>NFT Dashboard</h1> 

    {/* <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          <div className="relative">
            <div className='relative w-full h-72 rounded-lg overflow-hidden'>
              <div className="w-full h-full object-center object-cover"> */}
                <div id="renderNFTs" className='text-sky-400'></div>
              {/* </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    
    <Cards />
  </div>
  )
};