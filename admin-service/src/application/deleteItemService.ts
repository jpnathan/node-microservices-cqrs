import { DataSource } from "typeorm";

export default class DeleteItemService {
    itemsRepository: any;

    constructor(
        readonly dataSource: DataSource,
        readonly amqpChannel: any,
    ) {
        this.itemsRepository = dataSource.getRepository('Item');
    }

    public async call(id: number): Promise<any> {
        await this.itemsRepository.delete(id);
        this.amqpChannel.sendToQueue(
            "ITEM_DELETED",
            Buffer.from(JSON.stringify({ id }))
        );
    }
}