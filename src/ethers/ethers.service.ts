import { Injectable } from '@nestjs/common';
import { ethers } from "ethers";
import { jsonManager } from '../utils/jsonGenerator';

@Injectable()
export class EthersService {
    private readonly infuraProvider: ethers.providers.InfuraProvider;
    
    constructor() {
      this.infuraProvider =  new ethers.providers.InfuraProvider("goeli", {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_API_KEY
      });
    }

      async generateKeyPair(): Promise<[string, string]> {
        const wallet = ethers.Wallet.createRandom()
        const privateKey = wallet.privateKey;
        const publicKey = wallet.publicKey;
        return [privateKey, publicKey];
      }
    
      async mint(): Promise<number> {
        let metadataFilePath = await jsonManager.generateJson();
        let tokenId; // ether.contract.mint
        return tokenId;
      }

      async convert(): Promise<number> {
        let oldTokenURI = await this.findByTokenId();
        let newTokenURI = await jsonManager.updateJson();
        let tokenId; // ether.contract.writeData(oldTokenURI, newTokenURI);
        return tokenId;
      }
    
      async findByTokenId(): Promise<number> {
        let metadata; // ether.contract.mint
        return metadata;
      }


}
