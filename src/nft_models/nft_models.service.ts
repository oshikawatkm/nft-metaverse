import { Injectable } from '@nestjs/common';
import { CreateNftModelDto } from './dto/create-nft_model.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftModel } from './nft_model.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class NftModelsService {
    constructor(
        @InjectRepository(NftModel)
        private nftModelRepository: Repository<NftModel>,
      ) {}
    
      create(createNftModelDto: CreateNftModelDto, tokenId: number, filename: string, user: User): Promise<NftModel> {
        const nftModel = new NftModel();
        nftModel.tokenId = tokenId;
        nftModel.name = createNftModelDto.name;
        nftModel.copyright = createNftModelDto.copyright;
        nftModel.format = createNftModelDto.format;
        nftModel.description = createNftModelDto.description;
        nftModel.filename = filename;
        nftModel.users = [user];
    
        return this.nftModelRepository.save(nftModel);
      }
    
      async findAll(): Promise<NftModel[]> {
        return this.nftModelRepository.find();
      }
    
      async findOne(id: number): Promise<NftModel> {
        return this.nftModelRepository.findOneBy({ id });
      }
}
