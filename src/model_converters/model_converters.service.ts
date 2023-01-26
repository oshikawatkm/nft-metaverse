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
    
      create(createModelConverterDto: CreateModelConverterDto): Promise<ModelConverter> {
        const user = new ModelConverter();
        user.name = createModelConverterDto.name;
        user.email = createModelConverterDto.email;
        user.did = createModelConverterDto.did;
        user.password = createModelConverterDto.password;
    
        return this.modelConvertersRepository.save(user);
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
