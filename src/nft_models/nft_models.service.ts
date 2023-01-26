import { Injectable } from '@nestjs/common';
import { CreateNftModelDto } from './dto/create-nft_model.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftModel } from './nft_model.entity';

@Injectable()
export class NftModelsService {
    constructor(
        @InjectRepository(NftModel)
        private nftModelRepository: Repository<NftModel>,
      ) {}
    
      create(createNftModelDto: CreateNftModelDto): Promise<NftModel> {
        const nftModel = new NftModel();
        nftModel.name = createNftModelDto.name;
        nftModel.filename = createNftModelDto.filename;
        nftModel.copyright = createNftModelDto.copyright;
        nftModel.modelFormat = createNftModelDto.modelFormat;
        nftModel.description = createNftModelDto.description;
    
        return this.nftModelRepository.save(nftModel);
      }
    
      async findAll(): Promise<NftModel[]> {
        return this.nftModelRepository.find();
      }
    
      findOne(id: number): Promise<NftModel> {
        return this.nftModelRepository.findOneBy({ id });
      }
}
