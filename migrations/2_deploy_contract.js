const SToken = artifacts.require("SToken");

const Ballot = artifacts.require("Ballot");

module.exports = async function (deployer) {
  await  deployer.deploy(SToken);
  //await  deployer.deploy(Ballot);
};

