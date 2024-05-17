import { IsString } from 'class-validator';

export class StoreDto {
  @IsString()
  name: string;
}
