import { Injectable } from '@nestjs/common';

@Injectable()
export class EtherService {

    constructor(

      ) {}
    
      async mint(): Promise<number> {
        let metadataFilePath = await this.generateMetadeta();
        let tokenId; // ether.contract.mint
        return tokenId;
      }

      async convert(): Promise<number> {
        let oldTokenURI = await this.findByTokenId();
        let newTokenURI = await this.generateMetadeta();
        let tokenId; // ether.contract.writeData(oldTokenURI, newTokenURI);
        return tokenId;
      }
    
      async findByTokenId(): Promise<number> {
        let metadata; // ether.contract.mint
        return metadata;
      }

      private async generateMetadeta() {
        let filePath; // ether.contract.mint
        return filePath;
      }
}
