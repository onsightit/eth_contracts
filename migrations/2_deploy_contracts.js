var Token = artifacts.require("./BurnableCrowdsaleToken");
var SafeMathLib = artifacts.require("./SafeMathLib");
var MilestonePricing = artifacts.require("./MilestonePricing");
var AllocatedCrowdsale = artifacts.require("./AllocatedCrowdsale");
var NullFinalizeAgent = artifacts.require("./NullFinalizeAgent");

const BigNumber = web3.BigNumber;

module.exports = function(deployer) {

    const decimals = 18;

    //1 billion Token as initial supply
    const initialSupply = new BigNumber('1e+27'); //1 billion * 10 ^ 18
  
    //Name and Symbol are set later 
    deployer.deploy(SafeMathLib);
    deployer.link(SafeMathLib, [Token, MilestonePricing, AllocatedCrowdsale]);

    //Step 1: Create a Multi-Sig contract signed by team members 
    const multisig = '0x37ae4a59764d47cbf33b274909da65bdd4b0c10f';

    //Step 2: Token created in this contract - It does not handle the distribution
    deployer.deploy(Token, "", "", initialSupply, decimals, false).then(function() {

        const starttime = new BigNumber('1509446800');
        const milestone1 = web3.toWei('0.010', 'ether');

        const time2 = starttime.plus(30*60); //begins 30 mins after start
        const milestone2 = web3.toWei('0.012', 'ether');
        
        const time3 = starttime.plus(2*30*60); //begins 60 mins after start
        const milestone3 = web3.toWei('0.014', 'ether');

        const time4 = starttime.plus(4*30*60); //begins 60 mins after start
        
        //Step 3: Pricing strategy - crowdsale contract will call contract to get the price of a token everytime users sends ether to this contract address
        //Funds collected are sent to 
        return deployer.deploy(MilestonePricing, [starttime, milestone1, time2, milestone2, time3, milestone3, time4, 0]).then(function() {

            //Step 4: Distribute the Token //? 
            return deployer.deploy(AllocatedCrowdsale, Token.address, MilestonePricing.address, multisig, starttime, time4, web3.toWei(20, 'ether'), '0xd29bff0eac74310fa31a8dcdc9ec8ccb57397b18').then(function() {

                //Step 5: Finalizing agent - 
                return deployer.deploy(NullFinalizeAgent, AllocatedCrowdsale.address).then(function(){
                    var token;
                    Token.deployed().then(function(instance){
                        token = instance;
                        console.log("token address" + token.address);
                        return;
                    })
                })
            })
        });
    });
};
