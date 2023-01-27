import { Injectable } from '@nestjs/common';
import { ethers } from "ethers";
import { JsonManager } from 'src/utils/jsonManager';

@Injectable()
export class EthersService {
    private readonly _jsonManager: JsonManager;
    private readonly infuraProvider: ethers.providers.InfuraProvider;
    
    constructor() {
      this.infuraProvider =  new ethers.providers.InfuraProvider("goerli", {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_API_KEY
      });
      this._jsonManager = new JsonManager();
    }

      async generateKeyPair(): Promise<[string, string]> {
        const wallet = ethers.Wallet.createRandom()
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        return [privateKey, publicKey];
      }
    
      async mint(
        name: string,
        creator: string,
        description: string,
        format: string,
        copyright: string,
        modelPath: string,
      ): Promise<[number, string]> {
        let metadataFilePath = await this._jsonManager.generateJson(
          name, creator, description, format, copyright, modelPath
        );
        let tokenId; // ether.contract.mint
        return [tokenId, metadataFilePath];
      }

      async convert(): Promise<number> {
        let oldTokenURI = await this.findByTokenId();
        let newTokenURI; // = await jsonManager.updateJson();
        let tokenId; // ether.contract.writeData(oldTokenURI, newTokenURI);
        return tokenId;
      }
    
      async findByTokenId(): Promise<number> {
        let metadata; // ether.contract.mint
        return metadata;
      }


}
