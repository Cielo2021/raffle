const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe.all("Raffle Unit Tests", async function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  // enter the raffle
                  const startingTimesStamp = await raffle.getLatestTimesStamp()
                  const accounts = await ethers.getSigner()

                  await new Promise(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          
                          try {
                            // add asserts here
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const winnerEndingBalance = await accounts[0].getBalance()
                            const endingTimeStamp = await raffle.endingTimeStamp()

                            await expect(raffle.getPlayer[0]).to.be.reverte
                            assert.equal(recentWinner.toString(), accounts[0].address)
                            assert.equal(raffleState, 0)
                            assert.equal(
                                winnerEndingBalance.toString(),
                                winnerStartingBalance.add(raffleEntranceFee).toString()
                                )
                                assert(endingTimeStamp > startingTimeStamp)
                                resolve()
                          } catch (error) {
                              console.log(error)
                              reject(e)
                          }
                      })
                      // then entering the raffle 
                      await raffle.enterRaffle({ value: raffleEntranceFee })
                      const winnerStartingBalance = await accounts[0].getBalance()

                      // and this code wont complete until our listener has finished listening! 
                  })

                  // setup listener before we enter the raffle
                  // Just in case the blockchain moves REALLY fast

                  // await raffle.enterRaffle({ value: raffleEntranceFee })
              })
          })
      })
