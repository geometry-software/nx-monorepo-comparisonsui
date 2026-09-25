import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import type { SessionTokenInput, SessionTokenUpdate } from "@cui/account/sessions";
import { SessionTokenService } from "./session-token.service.js";

@Controller("auth/tokens")
export class SessionTokenController {
  constructor(private readonly tokens: SessionTokenService) {}

  @Get()
  findAll() {
    return this.tokens.findAll();
  }

  @Post()
  create(@Body() body: SessionTokenInput) {
    return this.tokens.create(body);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() body: SessionTokenUpdate,
  ) {
    return this.tokens.update(parseId(id), body);
  }
}

function parseId(value: string): number {
  const id = Number(value);
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(id)) {
    throw new BadRequestException("Session ID must be a positive integer");
  }
  return id;
}
