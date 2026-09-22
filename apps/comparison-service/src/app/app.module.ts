import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createMongoTypeOrmOptions } from '@cui/network/providers';
import { Comparison } from './comparison.entity';
import { ComparisonsController } from './comparisons.controller';
import { ComparisonsService } from './comparisons.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createMongoTypeOrmOptions(config, 'COMPARISONS_MONGODB_URI'),
    }),
    TypeOrmModule.forFeature([Comparison]),
  ],
  controllers: [ComparisonsController],
  providers: [ComparisonsService],
})
export class AppModule {}
