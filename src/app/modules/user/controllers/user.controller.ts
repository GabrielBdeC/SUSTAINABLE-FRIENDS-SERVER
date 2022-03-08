import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('preference')
  async getPreferences(@Request() req) {
    return this.userService.getPreferences(req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Post('preference')
  async postPreference(@Body() body, @Request() req) {
    return this.userService.postPreference(
      req.user.identifier,
      body.preferences,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleUser(@Request() req) {
    return req.user;
  }
}
