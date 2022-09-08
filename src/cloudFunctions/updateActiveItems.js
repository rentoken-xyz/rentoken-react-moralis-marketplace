// const { default: Moralis } = require("moralis/types");
const logger = Moralis.Cloud.getLogger();
logger.info("Hello World");
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed Tx");
});
