import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createTextUser, removeTextUser } from "./test-util";

describe('POST /api/users', () => {
  it('should can register new user', async() => {

    afterEach(async () => {
      await removeTextUser();
    })

    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'kipli123',
        name: 'test'
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("test");
      expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async() => {

    afterEach(async () => {
      await prismaClient.user.deleteMany({
        where: {
          username: "test"
        }
      })
    })

    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: '',
        password: '',
        name: ''
      });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.data.errors).toBeDefined();
  });

  it('should reject if username already registered', async() => {

    afterEach(async () => {
      await prismaClient.user.deleteMany({
        where: {
          username: "test"
        }
      })
    })

    let result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'kipli123',
        name: 'test'
      });

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("test");
      expect(result.body.data.name).toBe("test");
      expect(result.body.data.password).toBeUndefined();

      result = await supertest(web)
        .post('/api/users')
        .send({
          username: 'test',
          password: 'kipli123',
          name: 'test'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
  });
});

describe('POST /api/users/login', () => {
  beforeEach( async() => {
    await createTextUser();
  });

  afterEach(async () => {
    await removeTextUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "kipli123"
      });

      logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: "",
        password: ""
      });

      logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "salah"
      });

      logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: "salah",
        password: "salah"
      });

      logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/users/current', () => {
  beforeEach( async() => {
    await createTextUser();
  });

  afterEach(async () => {
    await removeTextUser();
  });

  it('should can get current user', async() => {
    const result = await supertest(web)
      .get('/api/users/current')
      .get('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('should reject if token is invalid', async() => {
    const result = await supertest(web)
      .get('/api/users/current')
      .get('Authorization', 'test');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});