import express from 'express';
import 'express-async-errors'
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { NotFoundError, errorHandler } from '@swizy-packages/common';
import cookieSession from 'cookie-session'

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

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);



app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);


export default app;