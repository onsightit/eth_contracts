var MultiSigWallet = artifacts.require("./MultiSigWallet");

module.exports = function(deployer) {

  deployer.deploy(MultiSigWallet, ['0x37ae4a59764d47cbf33b274909da65bdd4b0c10f', '0xe52cc9723e8d15eac7c3ee9b905657c03b777ec3', '0x0b4d29428bac917d3199f862ec0dde86bc834089'], 2);

};


