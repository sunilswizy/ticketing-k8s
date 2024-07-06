import request from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';

it('fails when a email that does not exist is supplied', async () => {
    const email = faker.internet.email();

    await request(app)
        .post('/api/users/signin')
        .send({
            email,
            password: 'test'
        })
        .timeout({ deadline: 5000 })
        .expect(400);
});


it('fails when incorrect password', async () => {
    const email = faker.internet.email();
    const password = email.split('@')[0];
    await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .timeout({ deadline: 5000 })
        .expect(200);

    await request(app)
        .post('/api/users/signin')
        .send({
            email,
            password: 'test'
        })
        .timeout({ deadline: 5000 })
        .expect(400);
});

it('response with a cookie - successful login', async () => {
    const email = faker.internet.email();
    const password = email.split('@')[0];
    await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .timeout({ deadline: 5000 })
        .expect(200);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email,
            password
        })
        .timeout({ deadline: 5000 })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();

})