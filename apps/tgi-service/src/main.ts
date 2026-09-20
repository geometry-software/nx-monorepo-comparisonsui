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
      connectionKey: 'TGI_MONGODB_URI',
      label: 'TGI',
      requiresValue: true,
    }),
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureNestApplication(app);
  configureSwagger(app, { title: 'TGI time-series service' });
  const port = readPort(process.env.TGI_PORT, 3012);
  await app.listen(port);
  Logger.log('TGI API: http://localhost:' + port + '/api');
}
void bootstrap();

