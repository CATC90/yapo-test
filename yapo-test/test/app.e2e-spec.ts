import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TracksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/search_tracks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/search_tracks?name=nightwish')
      .expect(200);

    const data = response.body;

    expect(data).toHaveProperty('canciones');
    expect(data).toHaveProperty('total_albumes');
    expect(data).toHaveProperty('total_canciones');
    expect(data).toHaveProperty('albumes');
  });
  describe('/favoritos (POST)', () => {
    it('should return a success message if sended info is correct', async () => {
      const favoriteSong = {
        nombre_banda: 'nightwish',
        cancion_id: 288794607,
        usuario: 'carlos',
        ranking: '5/5',
      };

      const response = await request(app.getHttpServer())
        .post('/favoritos')
        .send(favoriteSong)
        .expect(201);

      const data = response.body;

      expect(data).toStrictEqual(favoriteSong);
    });

    it('should throw an bad request error if body is not valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/favoritos')
        .send({
          nombre_banda: null,
          cancion_id: '1',
          usuario: null,
          ranking: '6/5',
        })
        .expect(400);

      const data = response.body;

      expect(data).toStrictEqual({
        error: 'Bad Request',
        message: [
          'nombre_banda should not be empty',
          'nombre_banda must be a string',
          'cancion_id must be a number conforming to the specified constraints',
          'usuario should not be empty',
          'usuario must be a string',
          'ranking must match /^[0-5]\\/[0-5]$/ regular expression',
        ],
        statusCode: 400,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
