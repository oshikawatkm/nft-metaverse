import { Controller } from '@nestjs/common';
import { ModelConvertersService } from './model_converters.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('model_converters')
@Controller('model_converters')
export class ModelConvertersController {

  constructor(
    private readonly modelConvertersService: ModelConvertersService,
  ) {}


  
}
