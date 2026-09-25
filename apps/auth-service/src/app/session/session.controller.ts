import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { SessionService } from "./session.service.js";

type SessionCredentialBody = {
  credential: string;
};

type LogoutSessionBody = SessionCredentialBody & {
  id: string;
};

@Controller("auth/sessions")
export class AuthController {
  constructor(private readonly sessions: SessionService) {}

  @Get("providers")
  providers() {
    return this.sessions.providers();
  }

  @Post("current")
  current(@Body() body: SessionCredentialBody) {
    return this.sessions.current(parseCredential(body?.credential));
  }

  @Post()
  create() {
    return this.sessions.create();
  }

  @Post("verify")
  verify(@Body() body: SessionCredentialBody) {
    return this.sessions.verify(parseCredential(body?.credential));
  }

  @Post("logout")
  async logout(@Body() body: LogoutSessionBody): Promise<{ logout: boolean }> {
    await this.sessions.close(
      parseSessionId(body?.id),
      parseCredential(body?.credential),
    );
    return { logout: true };
  }
}

function parseCredential(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new BadRequestException("Session credential is required");
  }
  return value;
}

function parseSessionId(value: unknown): number {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    throw new BadRequestException(
      "Session id must be a positive integer string",
    );
  }
  const sessionId = Number(value);
  if (!Number.isSafeInteger(sessionId)) {
    throw new BadRequestException("Session id is outside the supported range");
  }
  return sessionId;
}
