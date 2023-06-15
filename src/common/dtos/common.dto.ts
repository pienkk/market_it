import { IsNumber, IsOptional } from "class-validator";

/**
 * 페이지 네이션 DTO (공통)
 * page = 1, limit = 10 기본값
 */
export class PageNationDto {
  @IsNumber()
  @IsOptional()
  readonly page: number = 1;

  @IsNumber()
  @IsOptional()
  readonly limit: number = 10;
}
