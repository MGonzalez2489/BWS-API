import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page?: number;
}
