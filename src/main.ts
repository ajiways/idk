import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigurationService } from './core/config/configratuion.service';
import { AuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authGuard = app.get(AuthGuard);
  app.useGlobalGuards(authGuard);
  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { exposeDefaultValues: true, excludeExtraneousValues: true } }));

  const configurationService = app.get(ConfigurationService);

  const config = new DocumentBuilder()
    .setTitle('Testovoe :^)')
    .setDescription('Users api')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
    },
      'JWT-auth'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configurationService.env.APP_PORT);
}
bootstrap();
