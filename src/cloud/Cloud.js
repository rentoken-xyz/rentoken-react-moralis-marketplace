Moralis.Cloud.define("getNFT", async (request) => {
    const logger = Moralis.Cloud.getLogger()

    let NFTId = request.params.nftid;
    let hexId = parseInt(NFTId).toString(16);
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + hexId).slice(-64)

    logger.info(paddedHex);
    
    return Moralis.Cloud.httpRequest({url: "https://yierjn0f1z5m.usemoralis.com/" + paddedHex + ".json"})
        .then(function(httpResponse){
            return httpResponse.text;
        })
 
});

// Moralis.Cloud.define("averageStars", async (request) => {
//   const query = new Moralis.Query("Review");
//   query.equalTo("movie", request.params.movie);
//   const results = await query.find();
//   let sum = 0;
//   for (let i = 0; i < results.length; ++i) {
//     sum += results[i].get("stars");
//   }
//   return sum / results.length;
// });