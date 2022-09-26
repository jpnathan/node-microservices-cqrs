import { DataSource } from "typeorm";
import CreateItemService from "../../application/createItemService";
import DeleteItemService from "../../application/deleteItemService";
import UpdateItemService from "../../application/updateItemService";
import HttpServer from "./httpServer";

export default class Router {
    private createItemService: CreateItemService;
    private updateItemService: UpdateItemService;
    private deleteItemService: DeleteItemService;

	constructor (
        readonly httpServer: HttpServer,
        readonly amqpChannel: any,
        readonly dataSource: DataSource,
    ) {
        this.createItemService = new CreateItemService(dataSource, amqpChannel);
        this.updateItemService = new UpdateItemService(dataSource, amqpChannel);
        this.deleteItemService = new DeleteItemService(dataSource, amqpChannel);
     }

	async init () {
		this.httpServer.on("post", "/api/items", async (params: any, body: any) => {
            await this.createItemService.call(body);
		});

        this.httpServer.on("put", "/api/items/:id", async (params: any, body: any) => {
            await this.updateItemService.call(params.id, body);
        });
		
		this.httpServer.on("delete", "/api/items/:id", async (params: any, body: any) => {
            await this.deleteItemService.call(params.id);
		});
	}
}
