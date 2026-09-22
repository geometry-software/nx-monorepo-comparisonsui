import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configureNestApplication, configureSwagger, readPort } from '@cui/network/providers';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureNestApplication(app);
  configureSwagger(app, { title: 'Correlation comparison orchestrator' });
  const port = readPort(process.env.COMPARISONS_PORT, 3017);
  await app.listen(port);
  Logger.log(`Comparison API: http://localhost:${port}/api · Swagger: http://localhost:${port}/docs`);
}
void bootstrap();
