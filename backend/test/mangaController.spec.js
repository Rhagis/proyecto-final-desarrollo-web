import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import app from '../src/app.js';
import { connectTestDB, disconnectTestDB } from './helpers/db.js';

let mongod;

describe('Manga controller', function() {
  this.timeout(10000);

  before(async () => {
    mongod = await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB(mongod);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return mangas from external API (GET /mangas)', async () => {
    const fakeData = { Page: { media: [{ id: 1, title: { romaji: 'Test Manga' } }] } };
    sinon.stub(axios, 'post').resolves({ data: fakeData });

    const res = await request(app).get('/mangas');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(fakeData);
  });
});
