import { IsNumber, IsString } from 'class-validator';

export class StoreAddressDto {
  @IsString()
  address: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}
