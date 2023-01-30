const ERC1948 = artifacts.require("ERC1948");
const ganache = require("ganache");
const Web3 = require("web3");
const AbiItem = require('web3-utils');
const ERC1948Contract = require('../build/contracts/ERC1948.json');
// const ERC1948 = require('../types/abi/ERC1948');

// const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:8545`));
// const contractAddress = "0x85c1c1a870ff475178f49b97321cb634369c4db5";
// const ABI = ERC1948Contract.abi as any as ERC1948;
// const contract = new this._web3.eth.Contract(ABI, contractAddress) as unknown as ERC1948;


contract('ERC1948', (accounts) => {
  it('should return symbol', async () => {
    const web3 = new Web3(ganache.provider());
    const erc1948Instance = await ERC1948.deployed();
    
    const symbol = await erc1948Instance.symbol.call();

    assert.equal(symbol, "MT", "symbol wasn't MetaverseToken");
  });

  it('should return name', async () => {
    const web3 = new Web3(ganache.provider());
    const erc1948Instance = await ERC1948.deployed();
    
    const name = await erc1948Instance.name.call();

    assert.equal(name, "MetaverseToken", "symbol wasn't MetaverseToken");
  });

  it('should issue token', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:8545`));
    const contractAddress = "0x85c1c1a870ff475178f49b97321cb634369c4db5";
    const ABI = ERC1948Contract.abi;
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const uri = "ipfs://11111111111"
    
    const tx = await contract.methods.newItem(accounts[0], uri).send({from: accounts[0]});
    // assert.equal(newItemId, 1, "Token has should issued");
    
    // const balance = (await contract.methods.balanceOf(accounts[0]).call());
    // assert.equal(balance, 1, "Token has should issued");


    const signedTx = await web3.eth.accounts.signTransaction(tx, accounts[0].p);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // const ownerAddress = await erc1948Instance.ownerOf.call(1);
    // assert.equal(ownerAddress, accounts[0], "Token has should issued");


  });
  // it('should call a function that depends on a linked library', async () => {
  //   const erc1948Instance = await ERC1948.deployed();
  //   const metaCoinBalance = (await erc1948Instance.getBalance.call(accounts[0])).toNumber();
  //   const metaCoinEthBalance = (await erc1948Instance.getBalanceInEth.call(accounts[0])).toNumber();

  //   assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  // });
  // it('should send coin correctly', async () => {
  //   const erc1948Instance = await ERC1948.deployed();

  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];

  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await erc1948Instance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await erc1948Instance.getBalance.call(accountTwo)).toNumber();

  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await erc1948Instance.sendCoin(accountTwo, amount, { from: accountOne });

  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await erc1948Instance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await erc1948Instance.getBalance.call(accountTwo)).toNumber();

  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});
