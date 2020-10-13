'use strict';
import { Context, ServiceBroker, ServiceSchema, ActionSchema } from 'moleculer';
import { Service } from './service';
import { init, say } from './hello/hello-biz';

export default class HelloService extends Service {
    constructor(broker: ServiceBroker, schema?: ServiceSchema<{}>) {
        super(broker, schema);
        init(this.log);
        this.parseServiceSchema({
            name: 'hello',
            actions: {
                say: this.say,
                doSomething: this.doSomething,
            },
        });
    }

    /**
     * @swagger
     * /hello/say:
     *    post:
     *      tags:
     *        - Hello
     *      summary: This should log something and return customer info.
     *      parameters:
     *        - in: formData
     *          name: name
     *          required: true
     *          schema:
     *            type: integer
     *          example: Hello
     *          description: Say your name.
     *        - in: formData
     *          name: age
     *          required: true
     *          type: integer
     *          description: Say your age.
     *      responses:
     *        200:
     *          description: Receive back a welcome word message with your name passed on.
     */
    // curl -X POST http://localhost:3000/api/hello/say -d 'name=kevin&age=23'
    // curl -X POST http://localhost:3000/api/hello/say -H 'Content-Type: application/json' -d '{"name": "kevin", "age": 23}'
    // curl -X POST "http://localhost:3000/api/hello/say" -H  "accept: application/json" -H  "Content-Type: application/json" -d "name=kevin&age=23"
    say: ActionSchema = {
        rest: '/say',
        /* // Enabling this validation requires json request with header 'Content-Type: application/json'
        params: {
            name: 'string',
            age: 'number'
        }, */
        handler: (ctx: Context<{ name: string; age: number }>): {} => {
            this.log.info(`say ctx.params: ${JSON.stringify(ctx.params)}`);
            return say(ctx.params.name, ctx.params.age);
        },
    };

    /**
     * @swagger
     *
     * /hello/doSomething:
     *   post:
     *     tags:
     *       - Hello
     *     summary: Do something.
     *     description: This should log something and return customer info.
     *     parameters:
     *       - name: user
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/UserInfo'
     *     responses:
     *       200:
     *         description: Result of something.
     */
    doSomething: ActionSchema = {
        rest: '/doSomething',
        handler: (ctx: Context<{ name: string; age: number }>) => {
            this.log.info(
                `doSomething ctx.params: ${JSON.stringify(ctx.params)}`
            );
            return {
                ts: new Date().getTime(),
                data: ctx.params,
            };
        },
    };
}

/**
 * @swagger
 *
 * definitions:
 *   UserInfo:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       age:
 *         type: number
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

