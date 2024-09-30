import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();


const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log("Connected to nats");

    const ticketPublisher = new TicketCreatedPublisher(stan); 

    const data = {
        id: '123',
        title: 'concert',
        price: 20,
        userId: '34'
    };

    await ticketPublisher.publish(data);
});

