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
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV != 'test',
    })
);
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