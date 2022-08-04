import {NestFactory} from '@nestjs/core'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import {AppModule} from './app.module'
import {ConfigService} from '@nestjs/config'
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({transform: true}))

  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('URL Shortener API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get('port'))
}

bootstrap()
