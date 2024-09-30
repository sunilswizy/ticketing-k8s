import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log("Connect as listener");

    stan.on('close', () => {
        console.log("Nats closed");
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});

process.on('SIGTERM', () => stan.close());
process.on('SIGINT', () => stan.close());



