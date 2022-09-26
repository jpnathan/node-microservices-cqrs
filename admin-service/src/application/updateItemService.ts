import { DataSource } from "typeorm";

export default class UpdateItemService {
    itemsRepository: any;

    constructor(
        readonly dataSource: DataSource,
        readonly amqpChannel: any,
    ) {
        this.itemsRepository = dataSource.getRepository('Item');
    }

    public async call(id: number, data: any): Promise<any> {
        const item = await this.itemsRepository.findOneBy({ id });
        this.itemsRepository.merge(item, data);
        const result = await this.itemsRepository.save(item);
        this.amqpChannel.sendToQueue(
          'ITEM_UPDATED',
          Buffer.from(JSON.stringify(result))
        );
    }
}