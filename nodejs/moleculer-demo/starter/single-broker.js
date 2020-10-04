// npm install moleculer --save

const { ServiceBroker } = require('moleculer');

// Create a broker
const broker = new ServiceBroker();

// Create a service
broker.createService({
    name: 'math',
    actions: {
        add(ctx) {
            return Number(ctx.params.a) + Number(ctx.params.b);
        },
    },
});
broker.createService({
    name: 'product',
    actions: {
        produce(ctx) {
            console.log(`Produce new product: ${JSON.stringify(ctx.params)}`);
            return 'New product produced successfully!';
        },
    },
});

// Start the broker
broker
    .start()
    .then(() => broker.call('math.add', { a: 5, b: 8 }))
    .then((res) => console.log(`5 + 8 = ${res}`))
    .then(() => broker.call('product.produce', { name: 'Apple', price: 5, expired: new Date() }))
    .then((res) => console.log(`Produce result: ${res}`))
    .catch((err) => console.error(`Error occured! ${err.message}`));
