import { Injectable } from '@nestjs/common';
import { ethers } from "hardhat";
import { JsonManager } from 'src/utils/jsonManager';

@Injectable()
export class EthersService {
    private readonly _jsonManager: JsonManager;
    private readonly _infuraProvider: any;
    
    constructor() {
      this._infuraProvider =  new ethers.providers.InfuraProvider("goerli", {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_API_KEY
      });
      this._jsonManager = new JsonManager();
    }

    async _loadContract() {
      const Contract = await ethers.getContractFactory("ERC1948");
      const contract = await Contract.attach(process.env.CONTRACT_ADDRESS)
      return contract; 
    }

      async generateKeyPair(): Promise<[string, string, string]> {
        const wallet = ethers.Wallet.createRandom()
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        const address = wallet.address;
        return [privateKey, publicKey, address];
      }
    
      async mint(
        address: string,
        name: string,
        description: string,
        format: string,
        copyright: string,
        creator: string,
        modelPath: string,
      ): Promise<[number, string]> {
        let metadataFilePath = await this._jsonManager.generateJson(
          name, creator, description, format, copyright, modelPath
        );
        const contract = await this._loadContract();
        let tokenId = await contract.newItem(address, metadataFilePath);
        return [tokenId, metadataFilePath];
      }

      async convert(tokenId: number, oldFilename: string, converter: string, format: string, model: string): Promise<number> {
        let oldTokenURI = await this.findByTokenId(tokenId);
        let newTokenURI = await this._jsonManager.updateJson(oldFilename, converter, format, model);
        const contract =  await this._loadContract();
        await contract.writeData(oldTokenURI, newTokenURI);
        return tokenId;
      }
    
      async filterEvent() {
        const contract =  await this._loadContract();

      }

      async findByTokenId(tokenId: number): Promise<number> {
        const contract =  await this._loadContract();
        let metadata = await contract.tokenURI(tokenId);
        return metadata;
      }

      async getBalance(privateKey): Promise<any> {
        let wallet =  new ethers.Wallet(privateKey, this._infuraProvider);
        return await wallet.getBalance();
      }
}
