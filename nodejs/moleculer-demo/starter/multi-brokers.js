// Show a implementation of a online shop to demonstrate the flow of user's request

const { ServiceBroker } = require('moleculer');
const HTTPServer = require('moleculer-web');

// Create the broker for node-1
// Define nodeID and set the communication bus
const brokerNode1 = new ServiceBroker({
    nodeID: 'node-1',
    transporter: 'NATS',
});

// Create the "gateway" service
brokerNode1.createService({
    // Define service name
    name: 'gateway',
    // Load the HTTP server
    mixins: [HTTPServer],

    settings: {
        routes: [
            {
                aliases: {
                    // When the "GET /products" request is made the "listProducts" action of "products" service is executed
                    'GET /products': 'products.listProducts',
                },
            },
        ],
    },
});

// Create the broker for node-2
// Define nodeID and set the communication bus
const brokerNode2 = new ServiceBroker({
    nodeID: 'node-2',
    transporter: 'NATS',
});

// Create the "products" service
brokerNode2.createService({
    // Define service name
    name: 'products',

    actions: {
        // Define service action that returns the available products
        listProducts(ctx) {
            console.log(ctx);
            return [
                { name: 'Apples', price: 5 },
                { name: 'Oranges', price: 3 },
                { name: 'Bananas', price: 2 },
            ];
        },
    },
});

// Start both brokers
Promise.all([brokerNode1.start(), brokerNode2.start()]);
