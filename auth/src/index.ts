import mongoose from 'mongoose';
import app from './app';

const PORT = 3000;


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
