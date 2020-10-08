import { ServiceBroker, Service as MoleculerService, Context } from 'moleculer';
import { Service, Action, Event, Method } from 'moleculer-decorators';
import * as web from 'moleculer-web';
import { IncomingMessage, ServerResponse } from 'http'; // Derive from: $ npm install @types/node --save-dev

const broker = new ServiceBroker({
    logger: true,
    logLevel: 'debug',
});

@Service({
    // name: 'auth',
    mixins: [web],
})
class ServiceName extends MoleculerService {
    // Without constructor (typescript)
    settings = {
        port: 3000,
        routes: [
            {
                path: '/api',
                // The auto-alias feature allows you to declare your route alias directly in your services.
                // The gateway will dynamically build the full routes from service schema.
                // Damn, it doesn't work!
                autoAliases: true,
                aliases: {
                    // 'GET /info': 'auth.getInfo',
                    'GET /custom'(req: IncomingMessage, res: ServerResponse) {
                        console.log(req.headers);
                        res.end('hello from custom handler');
                    },
                    'GET /info': 'ServiceName.getInfo',
                    'POST /login': 'ServiceName.login2',
                    'GET /products': 'ProductService.getShops',
                },
            },
        ],
    };

    @Action()
    getInfo(ctx: Context) {
        console.log(ctx.requestID);
        console.log('getInfo invoked!');
        return {
            ts: Math.random(),
        };
    }

    // curl -X POST "http://localhost:3000/api/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"username\": \"Death Star\", \"password\": \"12345\"}"
    @Action({
        name: 'login2',
        params: {
            username: 'string',
            password: 'string',
        },
    })
    async login(ctx: Context) {
        console.log(ctx.requestID);
        console.log('login invoked!');
        return {
            msg: 'Login success',
            ts: Math.random(),
        };
    }

    @Method
    getNowTime(ctx: Context) {
        console.log(`ServiceName.getNowTime: ${ctx.requestID}`);
        return {
            ts: new Date().getTime(),
        };
    }

    started() {
        // Reserved for moleculer, fired when started
    }

    created() {
        // Reserved for moleculer, fired when created
    }

    stopped() {
        // Reserved for moleculer, fired when stopped
    }
}

/**
 * The settings property below would take effect as long as apply the web mixin component into service,
 * which also means this process listen on another network port defined by the property: settings.port.
 */
// @Service({ mixins: [web] })
@Service()
class ProductService extends MoleculerService {
    /* settings = {
        port: 3001,
        routes: [
            {
                path: '/product',
                aliases: {
                    'GET /list': 'ProductService.getShops',
                },
            },
        ],
    }; */
    @Action()
    public getShops(ctx: Context) {
        console.log(`ShopService.getShops: ${ctx.requestID}`);
        return {
            ts: new Date().getTime(),
            data: [{ item: 'Apple', price: 23 }],
        };
    }
}

broker.createService(ServiceName);
broker.createService(ProductService);
broker.start();
