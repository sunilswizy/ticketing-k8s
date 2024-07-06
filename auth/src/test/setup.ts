import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';
import { faker } from '@faker-js/faker';
import request from 'supertest';

declare global {
    var signUp: () => Promise<[string, string[]]>;
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'testKey'

    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();

    await mongoose.connect(mongoURI);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany();
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});


global.signUp = async () => {
    const email = faker.internet.email();
    const password = email.split('@')[0];

    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(200)

    const cookie = authResponse.get('Set-Cookie')!;

    return [email, cookie];
}