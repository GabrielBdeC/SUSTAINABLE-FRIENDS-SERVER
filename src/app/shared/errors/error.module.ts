import { Module } from '@nestjs/common';
import { ErrorHandlerService } from './error.service';

@Module({
  imports: [],
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],
})
export class ErrorModule {}
