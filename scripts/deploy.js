const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("shan");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // Register domain "Asam"
  let txn = await domainContract.register("asam", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain asam.shan");

  txn = await domainContract.setRecord(
    "asam",
    "Am I a Solidity boss or what!!??"
  );
  await txn.wait();
  console.log("Set record for asam.shan");

  const address = await domainContract.getAddress("asam");
  console.log("Owner of domain asam:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
