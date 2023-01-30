import { Injectable } from '@nestjs/common';
import { JsonManager } from 'src/utils/jsonManager';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import ERC1948Contract from '../../build/contracts/ERC1948.json';
import { ERC1948 } from '../../types/abi/ERC1948';
import { Address } from 'cluster'; 
import crypto from 'crypto';

@Injectable()
export class EthersService {
    private readonly _jsonManager: JsonManager;
    private readonly _infuraProvider: any;
    private readonly _web3: any;
    private readonly _ABI: any;
    private readonly _contract: any;
    
    constructor() {
      this._web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2c19ec28f7294f02b6e40ebf0f440af9"));
      this._jsonManager = new JsonManager();
      this._contract = new this._web3.eth.Contract(ERC1948Contract.abi, process.env.CONTRACT_ADDRESS);
    }

      async generateKeyPair(): Promise<[string, string, string]> {
        const account = this._web3.eth.accounts.create();
        const privateKey = account.privateKey;
        const address = account.address;
        return [privateKey, address, address];
      }
    
      async mint(
        privKey: string,
        address: string,
        name: string,
        description: string,
        format: string,
        copyright: string,
        creator: string,
        modelPath: string
      ): Promise<[number, string]> {
        await this._getLatestTokenId();

        let metadataFilePath = await this._jsonManager.generateJson(
          name, creator, description, format, copyright, modelPath
        );
        const data = await this._contract.methods.newItem(address, metadataFilePath).encodeABI();
        let tx = await this._genetateTx(address, data);
        let transactionReceipt = await this._sendSignedTx(tx, privKey);
        let tokenId  = await this._getLatestTokenId();
        
        return [tokenId, metadataFilePath];
      }

      async convert(
        privKey: string,
        address: string, 
        tokenId: number, 
        oldFilename: string, 
        converter: string, 
        format: string, 
        model: string
      ): Promise<number> {
        let newTokenURI = await this._jsonManager.updateJson(oldFilename, converter, format, model);
        const data = await this._contract.methods.writeData(tokenId, newTokenURI).encodeABI();
        let tx = await this._genetateTx(address, data);
        let transactionReceipt = await this._sendSignedTx(tx, privKey);

        return transactionReceipt;
      }
    
      async filterEvent() {

      }

      async _getLatestTokenId(): Promise<number> {
        let latestTokenId = await this._contract.methods.totalSuply().call();
        console.log(latestTokenId)
        return latestTokenId;
      }


      async findByTokenId(tokenId: number): Promise<number> {
        let metadata = await this._contract.methods.tokenURI(tokenId).call();
        return metadata;
      }

      async getBalance(address): Promise<any> {
        let balance = await this._web3.eth.getBalance(address);
        return await balance;
      }

      async _genetateTx(address: string, data): Promise<object>{
        const nonce = await this._web3.eth.getTransactionCount(address, 'latest'); 
        let gasPrice = await this._web3.eth.getGasPrice();
        const tx = {
          'from': address,
          'to': process.env.CONTRACT_ADDRESS,
          'nonce': nonce,
          'gas': gasPrice+ 9000,
          'data': data
        };
        console.log(tx)
        return tx;
      }
    
    async _sendSignedTx(tx, privKey) {
      const signedTx = await this._web3.eth.accounts.signTransaction(tx, privKey);
      const transactionReceipt = await this._web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      return transactionReceipt;
    }
}
