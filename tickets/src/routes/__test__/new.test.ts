import request from 'supertest';
import app from '../../app';
import { Ticket } from '../../models/tickets';

it('has router handler /api/tickets', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});


it('It can only be accessed if the user is authenticated', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).toEqual(401);
});

it('It can access if user is authenticated', async () => {
    console.log("cookie", global.signUp());
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({})

    expect(response.status).not.toEqual(401);
});

it('It returns an error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            price: 10
        })
        .expect(400);
});


it('It returns an error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'title22',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'title22'
        })
        .expect(400);
});


it('It creates an tickets', async () => {

    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0);


    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signUp())
        .send({
            title: 'New title',
            price: 10
        })
        .expect(201);
    
    ticket = await Ticket.find({});
    expect(ticket.length).toEqual(1);
    expect(ticket[0].title).toEqual('New title');
    expect(ticket[0].price).toEqual(10);
});