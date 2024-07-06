import request from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';

it('returns a 201 on successful signup', async () => {
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
});

it('returns a 400 on bad Request', async () => {
    const email = faker.internet.email();
    const password = email.split('@')[0];

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@',
            password
        })
        .timeout({ deadline: 5000 })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password: '21'
        })
        .timeout({ deadline: 5000 })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({})
        .timeout({ deadline: 5000 })
        .expect(400);
});

it('Duplicate Email - bad request', async () => {
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
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .timeout({ deadline: 5000 })
        .expect(400);
});

it('set a cookie after successful login', async () => {
    const email = faker.internet.email();
    const password = email.split('@')[0];

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .timeout({ deadline: 5000 })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
}); 