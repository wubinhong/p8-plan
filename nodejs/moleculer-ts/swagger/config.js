const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

function getApis(relativePaths) {
    return relativePaths.map((p) => path.join(__dirname, p));
}

const options = {
    // List of files to be processed.
    apis: getApis(['../services/*.service.ts']),
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    swaggerDefinition: {
        // openapi: '3.0.1', // From OpenAPI 3.0, securityDefinitions were renamed to securitySchemes and moved inside components.
        host: 'localhost:3000', // the host or url of the app
        basePath: '/api', // the basepath of your endpoint
        info: {
            title: 'Hucat corp restfull backend api', // Title (required)
            version: '1.0', // Version of Hucat backend api (required)
        },
        components: {},
        securityDefinitions: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-hucat-token',
                description: 'Token authorization of an API',
            },
        },
        security: [
            {
                apiKeyAuth: [],
            },
        ],
    },
    explorer: true,
};
const specs = swaggerJsdoc(options);

module.exports = specs;
