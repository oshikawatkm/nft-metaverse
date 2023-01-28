import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModelsController } from './nft_models/nft_models.controller';
import { UsersController } from './users/users.controller';
import { ModelConvertersController } from './model_converters/model_converters.controller';
import { OrdersController } from './orders/orders.controller';
import { NftModelsService } from './nft_models/nft_models.service';
import { NftModelsModule } from './nft_models/nft_models.module';
import { UsersService } from './users/users.service';
import { ModelConvertersService } from './model_converters/model_converters.service';
import { OrdersService } from './orders/orders.service';

import { User } from './users/user.entity';
import { ModelConverter } from './model_converters/model_converter.entity';
import { Order } from './orders/order.entity';
import { NftModel } from './nft_models/nft_model.entity';
import { UsersModule } from './users/users.module';
import { ModelsConvertersModule } from './model_converters/model_converters.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [
        User,
        ModelConverter,
        NftModel,
        Order,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      ModelConverter,
      NftModel,
      Order,
    ]),
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    UsersModule,
    ModelsConvertersModule,
    NftModelsModule,
    OrdersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
