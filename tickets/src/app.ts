import express from 'express';
import 'express-async-errors'
import { NotFoundError, currentUser, errorHandler } from '@swizy-packages/common';
import cookieSession from 'cookie-session'
import { createTicketRouter } from './routes/new';
import { ShowTicketsRouter } from './routes/show';
import { IndexTicketRouter } from './routes';
import { UpdateTicketRouter } from './routes/update';

const app = express();
app.use(express.json());

app.set('trust proxy', true);

app.use(cookieSession({
    name: 'session',
    keys: ['secretKey1', 'secretKey2'],
    maxAge: 24 * 60 * 60 * 1000,  
    httpOnly: true,
    secure: false                  
}));
app.use(currentUser)

app.use(createTicketRouter);
app.use(ShowTicketsRouter);
app.use(IndexTicketRouter);
app.use(UpdateTicketRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);


export default app;