import { IsNumber, Min } from 'class-validator';

export class StoreServiceDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  time: number;
}
