import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
      ) {}
    
      create(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = new Order();
        order.tokenId = createOrderDto.tokenId;
        order.reward_wei = createOrderDto.reward_wei;
        order.status = 1; 

        return this.ordersRepository.save(order);
      }
    
      async findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
      }
    
      findOne(id: number): Promise<Order> {
        return this.ordersRepository.findOneBy({ id });
      }

      async commission(id: number, modelConverterId: number): Promise<Order> {
        let order = await this.ordersRepository.findOneBy({ id });
        order.status = 2;

        return this.ordersRepository.save(order);
      }

      async complete(id: number, modelConverterId: number): Promise<Order> {
        let order = await this.ordersRepository.findOneBy({ id });
        order.status = 3;

        return this.ordersRepository.save(order);
      }
}
