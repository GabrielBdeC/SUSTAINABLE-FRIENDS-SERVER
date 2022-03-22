import {
  ArrayContains,
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreatePointDto {
  @IsNotEmpty({ message: 'Latitude column must not be empty.' })
  @IsLatitude({ message: 'Latitude value must be a number between -90 and 90' })
  latitude: number;

  @IsNotEmpty({ message: 'Longitude column must not be empty.' })
  @IsLongitude({
    message: 'Longitude column must be a number between -180 and 180.',
  })
  longitude: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true, message: 'Items must be an array of numbers' })
  @ArrayNotEmpty()
  items: number[];

  @IsString()
  @IsOptional()
  description?: string;
}
