import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { IPreferences } from '../constants/preferences.constant';

export class PreferencesDto {
  @ValidateNested({ message: 'It is missing the items property.' })
  @Type(() => IPreferences)
  @IsNotEmpty({ message: 'Preferences value must not be empty.' })
  preferences: IPreferences;
}
