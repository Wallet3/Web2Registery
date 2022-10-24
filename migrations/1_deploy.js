const Web2Registry = artifacts.require("Web2Registry");
const save = require("../scripts/save");

module.exports = async function (deployer, network) {
  await deployer.deploy(Web2Registry);
  const instance = await Web2Registry.deployed();

  save(network, { address: instance.address });
};
