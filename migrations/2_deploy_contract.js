const SToken = artifacts.require("SToken");

const Ballot = artifacts.require("Ballot");
const ethers = require('ethers')
const utils = ethers.utils

module.exports = async function (deployer) {
  await  deployer.deploy(SToken);
  await  deployer.deploy(Ballot,[utils.formatBytes32String("increase"),utils.formatBytes32String("decrease")]);

};

