import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { UserService } from '../services/user.service';

@Controller('api/v1/:id/')
export class DeleteUserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Param('userIdentifier') userId: string) {
    return userId;
  }
}
