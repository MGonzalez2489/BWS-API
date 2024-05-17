import { IsString } from 'class-validator';

export class StoreAddressDto {
  @IsString()
  street: string;

  @IsString()
  zipCode: number;
}
