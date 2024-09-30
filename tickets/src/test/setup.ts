import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';

declare global {
    var signUp: () => [string];
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'testKey'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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


const getRandomId = () => {
    return new mongoose.Types.ObjectId().toHexString();
}

global.signUp = () => {
    const email = faker.internet.email();
    const id = getRandomId();

    const token = sign({ email, id }, process.env.JWT_KEY!);

    const session = { jwt: token };
    const base64 = Buffer.from(JSON.stringify(session)).toString('base64');

    return [`session=${base64}`];


    // const password = email.split('@')[0];

    // const authResponse = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email,
    //         password
    //     })
    //     .expect(200)

    // const cookie = authResponse.get('Set-Cookie')!;

    // return [email, cookie];
}