import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      create(createUserDto: CreateUserDto, pubKey: string, privateKey: string): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.did = `${"did:ether:goerli:" + pubKey}`;
        user.password = createUserDto.password;
        user.publicKey = pubKey;
        user.privateKey = privateKey;
    
        return this.usersRepository.save(user);
      }
    
      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
      }

      // PoCなので簡易的な認証
      async login(loginUserDto: LoginUserDto): Promise<Boolean> {
        let user: LoginUserDto = await this.usersRepository.findOneBy({ email: loginUserDto.email });
        let result = user.password == loginUserDto.password ? true : false;
        return result;
      }
}
