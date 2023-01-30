import { Module } from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from '../users/users.module';
import { ModelsConvertersModule } from '../model_converters/model_converters.module';
import { EthersModule } from '../ethers/ethers.module';
import { NftModelsModule } from 'src/nft_models/nft_models.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]), 
        MulterModule.register({ dest: './files/models' }),
        UsersModule,
        ModelsConvertersModule,
        EthersModule,
        NftModelsModule
    ],
    providers: [OrdersService],
    exports: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
