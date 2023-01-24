import { Controller } from '@nestjs/common';
import { NftModelService } from './nft_model.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('nft-model')
@Controller('nft-model')
export class NftModelController {

  constructor(
    private readonly nftModelsService: NftModelService,
  ) {}

  
}
