import { DataSource } from "typeorm";

export default class ItemsRepository {
    private item: any;

    constructor(readonly dataSource: DataSource) {
        this.item = dataSource.getRepository('Item');
    }
    
    save(item: any): void {
        this.item.save(item)
    }

    findOne(id: Number): any {
        return this.item.findOneBy({ id })
    }

    delete(id: Number) {
        this.item.delete(id)
    }
}