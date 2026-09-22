import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { SessionService } from "./session.service.js";

const SESSION_COOKIE = "cui_session";

type LogoutSessionBody = {
  id: string;
};

@Controller("auth/sessions")
export class AuthController {
  constructor(private readonly sessions: SessionService) {}

  @Get("providers")
  providers() {
    return this.sessions.providers();
  }

  @Get("current")
  current(@Req() request: Request) {
    const credential = readCookie(request.headers.cookie, SESSION_COOKIE);
    if (!credential) return null;
    return this.sessions.current(credential);
  }

  @Post()
  async create(@Res({ passthrough: true }) response: Response) {
    const { session, credential } = await this.sessions.create();
    response.cookie(SESSION_COOKIE, credential, sessionCookieOptions());
    return session;
  }

  @Post("verify")
  verify(@Req() request: Request) {
    const credential = readCookie(request.headers.cookie, SESSION_COOKIE);
    if (!credential) {
      throw new UnauthorizedException("Session cookie is missing");
    }
    return this.sessions.verify(credential);
  }

  @Post("logout")
  async logout(
    @Body() body: LogoutSessionBody,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ logout: boolean }> {
    const credential = readCookie(request.headers.cookie, SESSION_COOKIE);
    if (!credential) {
      throw new UnauthorizedException("Session cookie is missing");
    }
    const sessionId = parseSessionId(body?.id);
    await this.sessions.close(sessionId, credential);
    response.clearCookie(SESSION_COOKIE, sessionCookieBaseOptions());
    return { logout: true };
  }
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

function sessionCookieOptions() {
  return {
    ...sessionCookieBaseOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
}

function sessionCookieBaseOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/sessions",
  };
}

function readCookie(
  header: string | undefined,
  name: string,
): string | undefined {
  if (!header) return undefined;
  for (const value of header.split(";")) {
    const separator = value.indexOf("=");
    if (separator < 0) continue;
    if (value.slice(0, separator).trim() !== name) continue;
    return decodeURIComponent(value.slice(separator + 1).trim());
  }
  return undefined;
}
