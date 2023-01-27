import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { EthersModule } from '../ethers/ethers.module';
import { NftModel } from './nft_model.entity';
import { NftModelsController } from './nft_models.controller';
import { NftModelsService } from './nft_models.service';

@Module({
    imports: [TypeOrmModule.forFeature([NftModel]), EthersModule, UsersModule, MulterModule.register({ dest: './files/models' }),],
    providers: [NftModelsService],
    exports: [NftModelsService],
    controllers: [NftModelsController],
})
export class NftModelsModule {}
