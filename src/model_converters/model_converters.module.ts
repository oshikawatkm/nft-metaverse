import { Module } from '@nestjs/common';
import { ModelConverter } from './model_converter.entity';
import { ModelConvertersController } from './model_converters.controller';
import { ModelConvertersService } from './model_converters.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EthersModule } from '../ethers/ethers.module';

@Module({
    imports: [TypeOrmModule.forFeature([ModelConverter]), EthersModule],
    providers: [ModelConvertersService],
    exports: [ModelConvertersService],
    controllers: [ModelConvertersController],
})
export class ModelsConvertersModule {}
