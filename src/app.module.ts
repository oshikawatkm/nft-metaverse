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
import { UserOrder } from './user-orders/user-order.entity';
import { OrderModelConverter } from './order-model_converters/order-model_converter.entity';


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
        UserOrder,
        OrderModelConverter
      ]
    }),
    TypeOrmModule.forFeature([
      User,
      ModelConverter,
      NftModel,
      Order,
      UserOrder,
      OrderModelConverter
    ]),
  ],
  controllers: [
    AppController, 
    NftModelsController,
    UsersController,
    ModelConvertersController,
    OrdersController,
  ],
  providers: [
    AppService, 
    NftModelsService,
    UsersService,
    ModelConvertersService,
    OrdersService
  ],
})
export class AppModule {}
