import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { configureSwagger, readPort } from "@cui/network/providers";
import { AppModule } from "./app/app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:4201",
    credentials: true,
  });
  configureSwagger(app, { title: "Auth service" });
  const port = readPort(process.env.AUTH_PORT, 3015);
  await app.listen(port);
  Logger.log(`Auth API: http://localhost:${port}/api/auth/sessions`);
  Logger.log(`Auth Swagger: http://localhost:${port}/docs`);
}

void bootstrap();
