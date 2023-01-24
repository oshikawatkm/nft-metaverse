import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModelController } from './nft_model/nft_model.controller';
import { NftModelService } from './nft_model/nft_model.service';
import { NftModelModule } from './nft_model/nft_model.module';

@Module({
  imports: [NftModelModule],
  controllers: [AppController, NftModelController],
  providers: [AppService, NftModelService],
})
export class AppModule {}
