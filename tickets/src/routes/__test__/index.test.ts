import request from 'supertest';
import app from '../../app';

const createTicket = () => {
    return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
        title: 'New',
        price: 23
    })
}

it('it can fetch list of tickets', async () => {
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    
    expect(response.body.length).toEqual(2);
});
