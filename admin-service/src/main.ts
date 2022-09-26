import ExpressAdapter from "./infra/api/expressAdapter";
import Router from "./infra/api/router";
import mySQLAdapter from "./infra/database/mySQLAdapter";
import AMQPChannel from "./infra/rabbitMQ/channel";

const httpServer = new ExpressAdapter;
const amqpChannel = new AMQPChannel;

const dataSource = new mySQLAdapter;
dataSource.initialize().then((database) => {
    const router = new Router(httpServer, amqpChannel.init(), database);
    router.init();
});

httpServer.listen(3000)