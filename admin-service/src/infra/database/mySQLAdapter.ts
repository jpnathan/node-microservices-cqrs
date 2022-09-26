import Connection from "./connection";
import { DataSource } from "typeorm"
import Item from "../../domain/entity/items";

export default class mySQLAdapter implements Connection {

    constructor() { }

    public async initialize(): Promise<DataSource> {
        const dataSource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3036,
            username: "myuser",
            password: "password",
            database: "db_admin",
            entities: [Item],
            logging: false,
            synchronize: true
        });

        const database = await dataSource.initialize();

        return database;
    }
}