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
  @Get(':id')
  async getSingleUser(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/preference')
  async getPreferences(@Param('id') userId: string) {
    return this.userService.getPreferences(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/preference')
  async postPreference(@Param('id') userId: string, @Body() body) {
    // return this.userService.postPreference(userId, body.preferences);
  }
}
