import request from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';

it('responds with details of current user', async () => {
    const [email, cookie] = await signUp();

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    console.log(response.body, response.body.currentUser.email)

    expect(response.body.currentUser.email).toEqual(email);
});

it('responds with null for non authenticated user', async () => {
    const response = await request(app)
        .get('/api/users/currentUser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toBeUndefined();
});