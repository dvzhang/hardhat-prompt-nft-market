const pinataSDK = require('@pinata/sdk');
const path = require("path")
const fs = require("fs");
const { callbackify } = require('util');

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
// console.log(`${pinataApiKey}`)
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

async function storeImages(imagesFilePath) {
    const fullImagePath = path.resolve(imagesFilePath);
    const files = fs.readdirSync(fullImagePath);
    let responses = [];
    console.log("----------------------------------------------------")
    console.log("Uploading to IPFS!")

    for (fileIndex in files) {
        console.log(`Working on ${fileIndex}`)
        const readableStreamForFile = fs.createReadStream(`${fullImagePath}/${files[fileIndex]}`)
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        }
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile, options)
            responses.push(response)
        } catch(error) {
            console.log(error)
        }
    }
    console.log("----------------------------------------------------")

    return {responses, files}
}

async function storeTokenUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}


module.exports = { storeImages, storeTokenUriMetadata }