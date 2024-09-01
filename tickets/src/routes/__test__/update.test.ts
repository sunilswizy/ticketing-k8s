import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

const getRandomId = () => {
    return new mongoose.Types.ObjectId().toHexString();
}

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'New',
            price: 23
        })
}


it('returns a 404 if the provided id does not exists', async () => {
    const id = getRandomId();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signUp())
        .send({
            title: 'new',
            price: 20
        })
        .expect(404);
});


it('returns a 401 if the user is not authenticated', async () => {
    const id = getRandomId();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'new',
            price: 20
        })
        .expect(401);
});


it('returns a 401 if the user does not own tickets', async () => {
    const response = await createTicket();

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signUp())
        .send({
            title: 'new',
            price: 20
        })
        .expect(401);
});


it('returns a 400 if the user provides invalid title or price', async () => {
    const cookie = global.signUp();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'New',
            price: 23
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new',
        })
        .expect(400);
});


it('updates the tickets', async () => {
    const cookie = global.signUp();
    const title = 'last piece';
    const price = 100;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'New',
            price: 23
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title,
            price
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});