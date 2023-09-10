import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";

describe('POST /api/users', () => {
  it('should can register new user', async() => {

    afterEach(async () => {
      await prismaClient.user.deleteMany({
        where: {
          username: "kiplidev"
        }
      })
    })

    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'kiplidev',
        password: 'kipli123',
        name: 'kipli'
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("kiplidev");
      expect(result.body.data.name).toBe("kipli");
      expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async() => {

    afterEach(async () => {
      await prismaClient.user.deleteMany({
        where: {
          username: "kiplidev"
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
          username: "kiplidev"
        }
      })
    })

    let result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'kiplidev',
        password: 'kipli123',
        name: 'kipli'
      });

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("kiplidev");
      expect(result.body.data.name).toBe("kipli");
      expect(result.body.data.password).toBeUndefined();

      result = await supertest(web)
        .post('/api/users')
        .send({
          username: 'kiplidev',
          password: 'kipli123',
          name: 'kipli'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
  });
});