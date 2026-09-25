import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  configureNestApplication,
  configureSwagger,
  readPort,
} from "@cui/network/providers";
import { AppModule } from "./app/app.module.js";
import { DataSourceService } from "./app/data-source/index.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureNestApplication(app, {
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:4201",
  });
  configureSwagger(app, { title: "Data source service" });
  const removedMemorySources = await app.get(DataSourceService).clearStaleMemorySources();
  Logger.log(`Removed ${removedMemorySources} stale in-memory data source records`);
  const port = readPort(process.env.DATA_SOURCES_PORT, 3018);
  await app.listen(port);
  Logger.log(`Data Source API: http://localhost:${port}/api/data-sources`);
}

void bootstrap();
