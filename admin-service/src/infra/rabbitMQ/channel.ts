import { Channel } from 'amqplib';
import AMQPConnection from './connection';

export default class AMQPChannel {
    private readonly ITEM_CREATED: 'ITEM-CREATED';
    private readonly ITEM_UPDATED: 'ITEM-UPDATED';
    private readonly ITEM_DELETED: 'ITEM-DELETED';

    public async init(): Promise<any> {
        try {
            const amqpConnection = new AMQPConnection();
            const connection = await amqpConnection.connect();
            const amqpChannel = await connection.createChannel();

            amqpChannel.assertQueue(this.ITEM_CREATED, { durable: false });
            amqpChannel.assertQueue(this.ITEM_UPDATED, { durable: false });
            amqpChannel.assertQueue(this.ITEM_DELETED, { durable: false });

            return amqpChannel;
        } catch (error: any) {
            if (error) {
                throw new Error(error.message);
            }
        }
    }
}