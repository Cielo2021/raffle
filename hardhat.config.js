require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "0x"

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0x"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0x"

module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY
        },
        namedAccounts: {
            deployer: {
                default: 0, // here this will by default take the first account as deployer
                1: 0,
            },
            player: {
                default: 1,
            },
        },
        mocha: {
            timeout: 10000000, // 10000000 seconds max
        },
    }




