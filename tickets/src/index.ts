import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from './nats-wrapper';

const PORT = 3000;


const initializeApps = async () => {
    await natsWrapper.connect(process.env.CLUSTER_ID!, process.env.CLIENT_ID!, process.env.NATS_URL!);

    
    natsWrapper.client.on('close', () => {
        console.log("Nats connection closed!");
        process.exit();
    });

    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on('SIGINT', () => natsWrapper.client.close());


    await mongoose.connect(process.env.MONGO_URI!)
        .then((res) => {
            console.log("Connected");
    })
        .catch((err) => {
            console.log("Not connected", err);
        })
    
    app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));
}


initializeApps();
