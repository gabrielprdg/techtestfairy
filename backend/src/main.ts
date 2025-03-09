import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // setting up the swagger docs.
  const config = new DocumentBuilder()
    .setTitle('Task Docs')
    .setDescription('An api to document all of the endpoints of this app.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
