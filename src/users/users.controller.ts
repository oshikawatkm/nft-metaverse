import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('model_converters')
@Controller('model_converters')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  
  
}
