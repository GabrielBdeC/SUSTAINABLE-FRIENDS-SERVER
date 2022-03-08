import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item.controller';
import { ItemDataConverter } from './data-converters/item.data-converter';
import { Item } from './models/item.entity';
import { ItemService } from './services/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemDataConverter],
  controllers: [ItemController],
})
export class ItemModule {}
