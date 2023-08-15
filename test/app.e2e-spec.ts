import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('End to end tests', () => {
  let app: INestApplication;
  let server: any;
  let api: any;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    server = app.getHttpServer();
    api = request(server);

    console.log(api);
  });

  // it('POST /auth/register', async () => {
  // const res = await api
  // .post('/auth/register')
  // .send({ email: 'johndoe@gmail.com', password: '12345678' })
  // .set('Content-Type', 'application/json');
  // .expect(200)

  // console.log(res);
  // });

  // it('POST /auth/login', async () => {
  //   const res = await api
  //     .post('/auth/login')
  //     .send({ email: 'johndoe@gmail.com', password: '12345678' })
  //     .set('Content-Type', 'application/json');
  // });
});
