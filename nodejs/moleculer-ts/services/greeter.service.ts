'use strict';

import { Context, ServiceBroker } from 'moleculer';
import { Service } from './service';

export default class GreeterService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);
        const me = this;
        this.parseServiceSchema({
            name: 'greeter',
            actions: {
                hello: {
                    rest: {
                        method: 'GET',
                        path: '/hello',
                    },
                    async handler(): Promise<string> {
                        return me.ActionHello();
                    },
                },

                /**
                 * @swagger
                 * /greeter/welcome:
                 *    get:
                 *      tags:
                 *        - Greeter
                 *      summary: This should return a welcome world message.
                 *      consumes:
                 *        - application/json
                 *      parameters:
                 *        - in: query
                 *          name: name
                 *          required: true
                 *          schema:
                 *            type: integer
                 *          example: Hello
                 *          description: Say your name.
                 *      responses:
                 *        200:
                 *          description: Receive back a welcome word message with your name passed on.
                 */
                welcome: {
                    rest: '/welcome',
                    params: {
                        name: 'string',
                        age: 'string', // The type of this field is different from ctx.params.age
                    },
                    async handler(
                        ctx: Context<{ name: string; age: number }>
                    ): Promise<string> {
                        let age = ctx.params.age; // Convert automatically, don't worry about the type conflict.
                        me.log.info(
                            `ctx.params: ${JSON.stringify(ctx.params)} | ${age}`
                        );
                        return me.ActionWelcome(ctx.params.name);
                    },
                },
            },
        });
    }

    // Action
    /**
     * @swagger
     * /greeter/hello:
     *    get:
     *      tags:
     *        - Greeter
     *      summary: This should return a hello world message.
     *      consumes:
     *        - application/json
     *      responses:
     *        200:
     *          description: Receive back a hello word message.
     */
    public ActionHello(): string {
        this.logger.info(`Action hello invoke! ${Math.random()}`);
        this.log.info(`Action.hello called! ${Math.random()}`);
        return 'Hello Moleculer';
    }

    public ActionWelcome(name: string): string {
        return `Welcome, ${name}`;
    }
}
