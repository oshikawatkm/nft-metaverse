import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthersModule } from '../ethers/ethers.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]), EthersModule, JwtModule],
    providers: [UsersService, AuthService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
