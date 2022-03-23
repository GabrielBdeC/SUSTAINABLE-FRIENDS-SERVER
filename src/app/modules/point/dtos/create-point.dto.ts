import {
  ArrayNotEmpty,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePointDto {
  @IsNotEmpty({ message: 'Latitude column must not be empty.' })
  @IsNumberString({ message: 'Latitude value must be a numeric string.' })
  @IsLatitude({ message: 'Latitude value must be a number between -90 and 90' })
  latitude: number;

  @IsNotEmpty({ message: 'Longitude column must not be empty.' })
  @IsNumberString({ message: 'Longitude value must be a numeric string.' })
  @IsLongitude({
    message: 'Longitude column must be a number between -180 and 180.',
  })
  longitude: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true, message: 'Items must be an array of numbers' })
  @ArrayNotEmpty({ message: 'Array must not be empty.' })
  items: number[];

  @IsString()
  @IsOptional()
  description?: string;
}
