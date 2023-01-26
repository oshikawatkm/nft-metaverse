import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthersModule } from '../ethers/ethers.module';
import { NftModel } from './nft_model.entity';
import { NftModelsController } from './nft_models.controller';
import { NftModelsService } from './nft_models.service';

@Module({
    imports: [TypeOrmModule.forFeature([NftModel]), EthersModule],
    providers: [NftModelsService],
    exports: [NftModelsService],
    controllers: [NftModelsController],
})
export class NftModelsModule {}
