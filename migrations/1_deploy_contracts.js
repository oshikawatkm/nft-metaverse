const ERC1948 = artifacts.require("ERC1948");

module.exports = function(deployer) {
  deployer.deploy(ERC1948);
};
