import request from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';

it('clear the cookie after sign out', async () => {
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
        .post('/api/users/signout')
        .send({})
        .timeout({ deadline: 5000 })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});