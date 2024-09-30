import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect' , () => {
                console.log("Connected To Nats");
                resolve();
            });

            this.client.on('error', (err) => {
                console.log("Error connecting with client", err);
                reject();
            });
        })
    };

    get client() {
        if(!this._client) {
            throw new Error('Cannot connect nats client before connecting')
        };
        return this._client;
    }

};

export const natsWrapper = new NatsWrapper();