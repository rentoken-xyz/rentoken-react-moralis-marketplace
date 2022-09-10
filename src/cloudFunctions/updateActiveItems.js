// const { default: Moralis } = require("moralis/types");
const logger = Moralis.Cloud.getLogger();
logger.info("Hello Cloud");
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed");
    // const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx");
    if (confirmed) {
        loffer.info("Found Item!");
        const ActiveItem = Moralis.Object.extend("ActiveItem");

        const activeItem = new ActiveItem();
        activeItem.set("marketplaceAddress", request.object.get("address"));
        activeItem.set("nftAddress", request.object.get("nftAddress"));
        activeItem.set("tokenId", request.object.set("tokenId"));
        logger.info(
            `Adding Address: ${request.object.get(
                "address"
            )}. TokenId: ${request.object.get("tokenId")}`
        );
        logger.info("Saving...");
        await activeItem.save();
    }
});
