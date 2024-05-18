import express from 'express';
import 'express-async-errors'
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.use(express.json());
const PORT = 3000;

app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);



app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);


const initializeMongo = async () => {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        .then((res) => {
            console.log("Connected");
        })
        .catch((err) => {
            console.log("Not connected", err);
        })
    app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));
}


initializeMongo();
