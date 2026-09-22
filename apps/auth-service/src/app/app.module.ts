import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  createFirebaseSupabaseProviderConfiguration,
  createSessionService,
} from "@cui/account/sessions";
import { AuthController } from "./session/session.controller.js";
import { SessionService } from "./session/session.service.js";
import { LIBRARY_SESSION_SERVICE } from "./session/session.tokens.js";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  controllers: [AuthController],
  providers: [
    {
      provide: LIBRARY_SESSION_SERVICE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        createSessionService(
          createFirebaseSupabaseProviderConfiguration({
            identity: {
              apiKey: config.get<string>("FIREBASE_API_KEY"),
              projectId: config.get<string>("FIREBASE_PROJECT_ID"),
            },
            storage: {
              url: config.get<string>("SUPABASE_URL"),
              publishableKey: config.get<string>("SUPABASE_PUBLISHABLE_KEY"),
            },
          }),
        ),
    },
    SessionService,
  ],
})
export class AppModule {}
