import { DataSource } from "typeorm";
import Item from "../domain/entity/items";

export default class CreateItemService {
    itemsRepository: any;

    constructor(
        readonly dataSource: DataSource,
        readonly amqpChannel: any,
    ) {
        this.itemsRepository = dataSource.getRepository(Item);
    }

    public async call(item: any): Promise<any> {
        const result = await this.itemsRepository.save(item);
        const amqpChannel = await this.amqpChannel
        
        this.amqpChannel.sendToQueue(
          "ITEM_CREATED",
          Buffer.from(JSON.stringify(result))
        );
    }
}
