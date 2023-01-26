import { Module } from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [OrdersService],
    exports: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
