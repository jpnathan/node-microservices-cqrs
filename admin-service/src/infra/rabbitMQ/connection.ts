import amqp from 'amqplib';

export default class AMQPConnection {
    connect() {
         return amqp.connect("amqp://guest:guest@127.0.1.1:15671/", (error: any, connection: any) => {
            if (error) {
              throw new Error(error.message);
            }

            return connection;
        });
    }
}