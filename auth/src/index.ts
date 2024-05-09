import express from 'express';
import 'express-async-errors'
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);


app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);


app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));