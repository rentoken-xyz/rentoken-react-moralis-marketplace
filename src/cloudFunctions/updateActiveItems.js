const logger = Moralis.Cloud.getLogger();
logger.info("Hello Cloud");
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    logger.info("is this working at all");
});
