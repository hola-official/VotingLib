const hre = require("hardhat");

async function main() {
  try {
    console.log("Deploying Voting Contract...");

    const [owner, voter1, voter2, voter3] = await hre.ethers.getSigners();

    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();
    const votingAddress = await voting.getAddress();

    console.log(`Voting Contract deployed to: ${votingAddress}`);
    console.log(`Owner address: ${owner.address}`);

    console.log("\nAdding candidates...");
    await voting.addCandidate(1);
    await voting.addCandidate(2);
    console.log("Added candidates with IDs: 1, 2");

    console.log("\nStarting voting session...");
    await voting.startVoting();
    console.log("Voting session started");

    console.log("\nCasting votes...");
    const vote1 = await voting.connect(voter1).vote(1);
    await vote1.wait();
    console.log(`Voter1 (${voter1.address}) voted for candidate 1`);

    const vote2 = await voting.connect(voter2).vote(2);
    await vote2.wait();
    console.log(`Voter2 (${voter2.address}) voted for candidate 2`);

    const vote3 = await voting.connect(voter3).vote(1);
    await vote3.wait();
    console.log(`Voter3 (${voter3.address}) voted for candidate 1`);

    console.log("\nRetrieving winner...");
    const [winnerId, winningVotes] = await voting.getWinner();
    console.log(`Winning Candidate ID: ${winnerId}`);
    console.log(`Winning Vote Count: ${winningVotes}`);

    const votes1 = await voting.getVotesForCandidate(1);
    const votes2 = await voting.getVotesForCandidate(2);

    console.log("\nFinal Vote Counts:");
    console.log(`Candidate 1: ${votes1} votes`);
    console.log(`Candidate 2: ${votes2} votes`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
