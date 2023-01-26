import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.did = createUserDto.did;
        user.password = createUserDto.password;
    
        return this.usersRepository.save(user);
      }
    
      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
      }
}
