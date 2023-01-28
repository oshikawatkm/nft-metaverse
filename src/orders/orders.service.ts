import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelConverter } from 'src/model_converters/model_converter.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
      ) {}
    
      async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
        try {
          const order = new Order();
          order.tokenId = createOrderDto.tokenId;
          order.reward_wei = createOrderDto.reward_wei;
          order.format = createOrderDto.format;
          order.status = 1; 
          order.users = [user];
          await this.ordersRepository.save(order);

          return order;
        } catch(err: unknown) {
          console.log(err)
        }
      }
    
      async findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
      }
    
      async findOne(id: number): Promise<Order> {
        return await this.ordersRepository.findOneBy({ id });
      }

      async commission(id: number, modelConverter: ModelConverter): Promise<Order> {
        let order = await this.ordersRepository.findOneBy({ id });
        order.status = 2;
        order.modelConverters = [modelConverter];

        console.log(order)

        return this.ordersRepository.save(order);
      }

      async complete(id: number, modelConverter: ModelConverter): Promise<Order> {
        let order = await this.ordersRepository.findOneBy({ id });
        order.status = 3;

        return this.ordersRepository.save(order);
      }
}
