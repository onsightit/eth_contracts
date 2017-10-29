# eth_contracts

## Prerequisite 
```
npm install

```

Install Truffle
```
sudo npm install -g truffle

```

Install Testrpc
```
sudo npm install -g ethereumjs-testrpc
testrpc

```
Copy first three addresses to multi_sig/2_deploy_contrcts.js variable "deployer.deploy(MultiSigWallet)".
Copy first address to migrations/2_deploy_contracts.js variable "multisig".

## Build and deploy
```
truffle compile
truffle migrate
```

Read truffleframework documentation for more help on build, deployment and interaction with the smart contract.
