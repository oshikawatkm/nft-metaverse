import { Injectable } from '@nestjs/common';
import { CreateModelConverterDto } from './dto/create-model_converter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelConverter } from './model_converter.entity';
import { LoginModelConverterDto } from './dto/login-converter.dto';

@Injectable()
export class ModelConvertersService {

    constructor(
        @InjectRepository(ModelConverter)
        private modelConvertersRepository: Repository<ModelConverter>,
      ) {}
    
      create(createModelConverterDto: CreateModelConverterDto, pubkey: string, privateKey: string, address: string): Promise<ModelConverter> {
        const modelConverter = new ModelConverter();
        modelConverter.name = createModelConverterDto.name;
        modelConverter.email = createModelConverterDto.email;
        modelConverter.did = `${"did:ether:goerli:" + pubkey}`,
        modelConverter.password = createModelConverterDto.password;
        modelConverter.publicKey = pubkey;
        modelConverter.privateKey = privateKey;
        modelConverter.address = address;
    
        return this.modelConvertersRepository.save(modelConverter);
      }
    
      async findAll(): Promise<ModelConverter[]> {
        return this.modelConvertersRepository.find();
      }
    
      findOne(id: number): Promise<ModelConverter> {
        return this.modelConvertersRepository.findOneBy({ id });
      }

      
      // PoCなので簡易的な認証
      async login(loginModelConverterDto: LoginModelConverterDto): Promise<Boolean> {
        let modelConverter: ModelConverter = await this.modelConvertersRepository.findOneBy({ email: loginModelConverterDto.email });
        let result = modelConverter.password == loginModelConverterDto.password ? true : false;
        return result;
      }
}
