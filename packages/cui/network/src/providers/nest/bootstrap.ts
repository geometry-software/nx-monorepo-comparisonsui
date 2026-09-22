import { ValidationPipe, type INestApplication } from "@nestjs/common";

export type ConfigurationReader = {
  get<TValue>(key: string): TValue | undefined;
  getOrThrow<TValue>(key: string): TValue;
};

export function configureNestApplication(app: INestApplication): void {
  app.setGlobalPrefix("api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}

export function createMongoTypeOrmOptions(
  config: ConfigurationReader,
  connectionKey: string,
) {
  return {
    type: "mongodb" as const,
    url: config.getOrThrow<string>(connectionKey),
    autoLoadEntities: true,
    synchronize: config.get<string>("NODE_ENV") !== "production",
  };
}

export function readPort(value: string | undefined, fallback: number): number {
  const port = Number(value ?? fallback);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Invalid port: ${value ?? fallback}`);
  }
  return port;
}
