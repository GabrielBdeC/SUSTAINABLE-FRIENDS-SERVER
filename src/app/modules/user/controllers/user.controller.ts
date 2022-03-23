import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard';
import { PreferencesDto } from '../dtos/preferences.dto';
import { User } from '../models/user.entity';
import { PreferencesValidationPipe } from '../pipes/post-preferences.pipe';
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
  async postPreference(
    @Body(new PreferencesValidationPipe()) body: PreferencesDto,
    @Request() req,
  ) {
    await this.userService.checkItems(body.preferences);
    return this.userService.postPreference(
      req.user.identifier,
      body.preferences,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('single')
  async getSingleUser(@Request() req) {
    return await this.userService.getSingleUser(req.user.identifier);
  }
}
