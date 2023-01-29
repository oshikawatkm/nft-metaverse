import { NestFactory } from '@nestjs/core';
import { VersioningType } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NFT Metaverse Platform')
    .setDescription('The NFT Metaverse Platform API description')
    .setVersion('1.0')
    .addTag('nft-models')
    .addTag('users')
    .addTag('model_converters')
    .build();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
