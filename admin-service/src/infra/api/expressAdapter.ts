import express, { Request, Response } from "express";
import HttpServer from "./httpServer";

export default class ExpressAdapter implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
	}

	public on(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response) {
			const output = await callback(req.params, req.body);
			res.json(output);
		});
	}

	public listen(port: number): void {
		this.app.listen(port);
        console.log(`Service is listening on ${port}`); 
	}
}
