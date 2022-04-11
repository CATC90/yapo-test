import { IsString, IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreateFavoriteSongDto {
  @IsString()
  @IsNotEmpty()
  nombre_banda: string;

  @IsNumber()
  cancion_id: number;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @Matches(/^[0-5]\/[0-5]$/)
  ranking: string;
}
