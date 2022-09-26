export default interface httpServer {
	on (method: string, url: string, callback: Function): void;
	listen (port: number): void;
}