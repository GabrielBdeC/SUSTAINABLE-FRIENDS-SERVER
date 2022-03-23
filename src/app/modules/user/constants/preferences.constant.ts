import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class IItemsPreference {
  @IsString({ message: 'Name value must be a string' })
  @IsNotEmpty({ message: 'Name value must not be empty.' })
  name: string;

  @IsBoolean({ message: 'Active value must be a boolean.' })
  @IsNotEmpty({ message: 'Active value must not be empty.' })
  active: true;
}

export class IPreferences {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IItemsPreference)
  items: IItemsPreference[];
}

export const newPreference: IPreferences = {
  items: [
    {
      name: 'Papel',
      active: true,
    },
    {
      name: 'Vidro',
      active: true,
    },
    {
      name: 'Lata de alumínio',
      active: true,
    },
    {
      name: 'Embalagem PET',
      active: true,
    },
    {
      name: 'Lata de aço',
      active: true,
    },
    {
      name: 'Embalagem longa vida',
      active: true,
    },
    {
      name: 'Ferro',
      active: true,
    },
    {
      name: 'Pilha',
      active: true,
    },
    {
      name: 'Bateria',
      active: true,
    },
    {
      name: 'Óleo de cozinha',
      active: true,
    },
    {
      name: 'Eletroeletrônico',
      active: true,
    },
    {
      name: 'Pneu',
      active: true,
    },
  ],
};
