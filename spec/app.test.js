const request = require('supertest')
const app = require('../app/app')
const db = require('../app/models');
const cleanDb = require('./helpers/cleanDb')

beforeAll(async () => {
    await cleanDb(db)
});

describe('GET /', () => {
    let response;

    beforeAll(async () => {
        await cleanDb(db)
    });
    beforeEach(async () => {
        await cleanDb(db)
        response = await request(app).get('/');
    })

    test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
    });



});
// #region Création d'un utilisateur
describe('POST /author', () => {

    let response;
    let data = {};

    beforeAll(async () => {
        data.firstName = 'John'
        data.lastName = 'Wick'
        response = await request(app).post('/author').send(data);
    })

    test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
    });
    test('It should return a json with the new author', async () => {
        expect(response.body.firstName).toBe(data.firstName);
        expect(response.body.lastName).toBe(data.lastName);
    });
    test('It should create and retrieve a post for the selected author', async () => {
        const author = await db.Author.findOne({
            where: {
                id: response.body.id
            }
        })
        expect(author.id).toBe(response.body.id)
        expect(author.firstName).toBe(data.firstName)
        expect(author.lastName).toBe(data.lastName)
    });
});
// #endregion

// #region AllUsers
describe('GET /authors', () => {

    let response;
    let data = {};
  
    beforeAll(async () => await cleanDb(db))
  
    describe('when there is no author in database', () => {
      beforeAll(async () => {
        response = await request(app).get('/authors').set('Accept', 'application/json');
      })
  
      test('It should not retrieve any authors in db', async () => {
        const authors = await db.Author.findAll()
        expect(authors.length).toBe(0);
      });
  
      test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
      });
      test('It should return a json with a void array', async () => {
        expect(response.body).toStrictEqual([]);
      });
    })
  });
// #endregion

afterAll(async () => {
    await cleanDb(db)
    await db.close()
});