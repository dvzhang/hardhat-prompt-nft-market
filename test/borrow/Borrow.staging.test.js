const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const {abi1, abi2} = require("../../constants")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("borrow Staging Tests", function () {
          let raffle, deployer, token1Contract, token2Contract

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("BLPool", deployer)
              token1Contract = await ethers.getContract("TZToken3", deployer)
              token2Contract = await ethers.getContract("TZToken6", deployer)
          })

          describe("deposit", function () {
              it("deposit with pool", async function () {
                  // enter the raffle
                  const accounts = await ethers.getSigners()
                  console.log(`Token1 ${token1Contract.address}`)
                  token1acc1bal = await token1Contract.balanceOf(accounts[0].getAddress())
                  console.log(`Token1 balance me ${token1acc1bal}`)
                  console.log(`Token2 ${token2Contract.address}`)

                  const tokensToSend = ethers.utils.parseEther("10")
                  const tx = await raffle.deposit(token1Contract.address, tokensToSend)
                  await tx.wait(1)
                  console.log("Ok, time to wait...")
                  token1acc1bal = await token1Contract.balanceOf(accounts[0].getAddress())
                  console.log(`Token1 balance me ${token1acc1bal}`)

                //   console.log("Setting up Listener...")
                //   await new Promise(async (resolve, reject) => {
                //       // setup listener before we enter the raffle
                //       // Just in case the blockchain moves REALLY fast
                //       raffle.once("WinnerPicked", async () => {
                //           console.log("WinnerPicked event fired!")
                //           try {
                //               // add our asserts here
                //               const recentWinner = await raffle.getRecentWinner()
                //               const raffleState = await raffle.getRaffleState()
                //               const winnerEndingBalance = await accounts[0].getBalance()
                //               const endingTimeStamp = await raffle.getLastTimeStamp()

                //               await expect(raffle.getPlayer(0)).to.be.reverted
                //               assert.equal(recentWinner.toString(), accounts[0].address)
                //               assert.equal(raffleState, 0)
                //               assert.equal(
                //                   winnerEndingBalance.toString(),
                //                   winnerStartingBalance.add(raffleEntranceFee).toString()
                //               )
                //               assert(endingTimeStamp > startingTimeStamp)
                //               resolve()
                //           } catch (error) {
                //               console.log(error)
                //               reject(error)
                //           }
                //       })
                //       // Then entering the raffle
                //       console.log("Entering Raffle...")
                //       const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                //       await tx.wait(1)
                //       console.log("Ok, time to wait...")
                //       const winnerStartingBalance = await accounts[0].getBalance()

                //       // and this code WONT complete until our listener has finished listening!
                //   })
              })
          })
      })
