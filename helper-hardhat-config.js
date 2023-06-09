const networkConfig = {
    31337: {
        name: "localhost",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
        mintFee: "10000000000000000", // 0.01 ETH
        subscriptionId: "588",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
        subscriptionId: "10347",
        keepersUpdateInterval: "30",
    },
}

const DECIMALS = "18"
const INITIAL_PRICE = "200000000000000000000"

const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const developmentChains = ["hardhat", "localhost"]

// const frontEndContractsFile = "../10nextjs-lottery/constants/contractAddresses.json"
const frontEndAbiFile = "../10nextjs-lottery/constants/abi.json"
const frontEndContractsFile = "../14.2nextjs-nft-marketplace-thegraph/constants/networkMapping.json"
const frontEndContractsFile2 =
    "../14.2nextjs-nft-marketplace-thegraph/constants/networkMapping.json"
const frontEndAbiLocation = "../14.2nextjs-nft-marketplace-thegraph/constants/"
const frontEndAbiLocation2 = "../14.2nextjs-nft-marketplace-thegraph/constants/"


module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndContractsFile2,
    frontEndAbiLocation,
    frontEndAbiLocation2,
    frontEndAbiFile,
    DECIMALS,
    INITIAL_PRICE,
}
