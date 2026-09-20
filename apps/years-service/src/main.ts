import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  configureNestApplication,
  configureSwagger,
  readPort,
} from '@nx-react-nestjs/backend';
import { SeriesServiceModule } from './app/series/series-service.module';

@Module({
  imports: [
    SeriesServiceModule.register({
      connectionKey: 'YEARS_MONGODB_URI',
      label: 'Years',
      requiresValue: false,
    }),
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureNestApplication(app);
  configureSwagger(app, { title: 'Years time-series service' });
  const port = readPort(process.env.YEARS_PORT, 3010);
  await app.listen(port);
  Logger.log('Years API: http://localhost:' + port + '/api');
}
void bootstrap();

