import { Controller } from '@nestjs/common';
import { NftModelsService } from './nft_models.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('nft-model')
@Controller('nft-model')
export class NftModelsController {

  constructor(
    private readonly nftModelsService: NftModelsService,
  ) {}

  
}
