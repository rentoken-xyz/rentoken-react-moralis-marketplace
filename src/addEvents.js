const Moralis = require("moralis/node");
require("dotenv").config();

// const contractAddress = "0xEE16B713D034fB6574BBb69082A34cB9C1491efe";

async function main() {
    await Moralis.start({
        serverUrl: "https://oegryd8yxw0z.usemoralis.com:2053/server",
        appId: "AaIPFNKQv3sxV60fNYz53a653g4FglMOmYrxxPo6",
        masterKey: "Ix34pcptMoKkcnO8hoo89dNPYwzXEwdPSkgyCW8J",
    });

    console.log(
        `Working with contract address "0xEE16B713D034fB6574BBb69082A34cB9C1491efe"`
    );

    let itemListedOptions = {
        chainId: "0x5",
        address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
        sync_historical: false,
        topic: "ItemListed(address, address, uint256, uint64, uint256, address)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "nftAddress",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint64",
                    name: "expires",
                    type: "uint64",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "pricePerSecond",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "payToken",
                    type: "address",
                },
            ],
            name: "ItemListed",
            type: "event",
        },
        tableName: "ItemListed",
    };

    // let itemRedeemedOptions = {
    //     chainId: "0x5",
    //     address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    //     sync_historical: false,
    //     topic: "ItemRedeemed(address, address, uint256 )",
    //     abi: {
    //         anonymous: false,
    //         inputs: [
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "owner",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "nftAddress",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "tokenId",
    //                 type: "uint256",
    //             },
    //         ],
    //         name: "ItemRedeemed",
    //         type: "event",
    //     },
    //     tableName: "ItemRedeemed",
    // };

    // let itemRentedOptions = {
    //     chainId: "0x5",
    //     address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    //     sync_historical: false,
    //     topic: "ItemRented(address, address, address, uint256, uint64, uint256, address)",
    //     abi: {
    //         anonymous: false,
    //         inputs: [
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "lessor",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "renter",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "nftAddress",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "tokenId",
    //                 type: "uint256",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint64",
    //                 name: "expires",
    //                 type: "uint64",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "pricePaid",
    //                 type: "uint256",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "address",
    //                 name: "payToken",
    //                 type: "address",
    //             },
    //         ],
    //         name: "ItemRented",
    //         type: "event",
    //     },
    //     tableName: "ItemRented",
    // };

    // let itemUpdatedOptions = {
    //     chainId: "0x5",
    //     address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    //     sync_historical: false,
    //     topic: "ItemUpdated(address, address , uint256, uint64, uint256, address)",
    //     abi: {
    //         anonymous: false,
    //         inputs: [
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "owner",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "nftAddress",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "tokenId",
    //                 type: "uint256",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint64",
    //                 name: "expires",
    //                 type: "uint64",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "pricePerSecond",
    //                 type: "uint256",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "address",
    //                 name: "payToken",
    //                 type: "address",
    //             },
    //         ],
    //         name: "ItemUpdated",
    //         type: "event",
    //     },
    //     tableName: "ItemUpdated",
    // };

    // let proceedsWithdrawnOptions = {
    //     chainId: "0x5",
    //     address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    //     sync_historical: false,
    //     topic: "ProceedsWithdrawn(address, address, uint256)",
    //     abi: {
    //         anonymous: false,
    //         inputs: [
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "operator",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "token",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "proceeds",
    //                 type: "uint256",
    //             },
    //         ],
    //         name: "ProceedsWithdrawn",
    //         type: "event",
    //     },
    //     tableName: "ProceedsWithdrawn",
    // };

    // let itemCanceledOptions = {
    //     chainId: "0x5",
    //     address: "0xEE16B713D034fB6574BBb69082A34cB9C1491efe",
    //     sync_historical: false,
    //     topic: "ItemCanceled(address, address, uint256)",
    //     abi: {
    //         anonymous: false,
    //         inputs: [
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "owner",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: true,
    //                 internalType: "address",
    //                 name: "nftAddress",
    //                 type: "address",
    //             },
    //             {
    //                 indexed: false,
    //                 internalType: "uint256",
    //                 name: "tokenId",
    //                 type: "uint256",
    //             },
    //         ],
    //         name: "ItemCanceled",
    //         type: "event",
    //     },
    //     tableName: "ItemCanceled",
    // };

    const listedResponse = await Moralis.Cloud.run(
        "watchContractEvent",
        itemListedOptions,
        { useMasterKey: true }
    );

    // const redeemedResponse = await Moralis.Cloud.run(
    //     "watchContractEvent",
    //     itemRedeemedOptions,
    //     { useMasterKey: true }
    // );
    //
    // const rentedResponse = await Moralis.Cloud.run(
    //     "watchContractEvent",
    //     itemRentedOptions,
    //     { useMasterKey: true }
    // );
    //
    // const updatedResponse = await Moralis.Cloud.run(
    //     "watchContractEvent",
    //     itemUpdatedOptions,
    //     { useMasterKey: true }
    // );
    //
    // const proceedsWithdrawnResponse = await Moralis.Cloud.run(
    //     "watchContractEvent",
    //     proceedsWithdrawnOptions,
    //     { useMasterKey: true }
    // );
    //
    // const canceledResponse = await Moralis.Cloud.run(
    //     "watchContractEvent",
    //     itemCanceledOptions,
    //     { useMasterKey: true }
    // );

    if (listedResponse.success) {
        console.log(
            "Success! Database updated with watching new List Item event"
        );
    } else {
        console.log(
            "Error: Database could not updated with watching new List Item event. Maybe because this event already exist."
        );
        console.log(listedResponse);
    }

    // if (redeemedResponse.success) {
    //     console.log(
    //         "Success! Database updated with watching new Redeem Item event"
    //     );
    // } else {
    //     console.log(
    //         "Error: Database could not updated with watching new Redeem Item event. Maybe because this event already exist."
    //     );
    //     console.log(redeemedResponse);
    // }

    // if (rentedResponse.success) {
    //     console.log(
    //         "Success! Database updated with watching new Rented Item event"
    //     );
    // } else {
    //     console.log(
    //         "Error: Database could not updated with watching new Rented Item event. Maybe because this event already exist."
    //     );
    //     console.log(rentedResponse);
    // }

    // if (updatedResponse.success) {
    //     console.log(
    //         "Success! Database updated with watching new Updated Item event"
    //     );
    // } else {
    //     console.log(
    //         "Error: Database could not updated with watching new Updated Item event. Maybe because this event already exist."
    //     );
    //     console.log(updatedResponse);
    // }

    // if (proceedsWithdrawnResponse.success) {
    //     console.log(
    //         "Success! Database updated with watching new Withdraw Proceeds event"
    //     );
    // } else {
    //     console.log(
    //         "Error: Database could not updated with watching new Withdraw Proceeds event. Maybe because this event already exist."
    //     );
    //     console.log(proceedsWithdrawnResponse);
    // }

    // if (canceledResponse.success) {
    //     console.log(
    //         "Success! Database updated with watching new Cancel Item event"
    //     );
    // } else {
    //     console.log(
    //         "Error: Database could not updated with watching new Cancel Item event. Maybe because this event already exist."
    //     );
    //     console.log(canceledResponse);
    // }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
