const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

function getApis(relativePaths) {
    return relativePaths.map((p) => path.join(__dirname, p));
}

const options = {
    // List of files to be processed.
    apis: getApis(['rest/*/index.js']),
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    basePath: '/',
    swaggerDefinition: {
        openapi: '3.0.1', // YOU NEED THIS
        info: {
            title: 'Hucat corp restfull backend api', // Title (required)
            version: '1.0', // Version of Hucat backend api (required)
        },
        components: {
            securitySchemes: {
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-hucat-token',
                    description: 'Token authorization of an API',
                },
            },
        },
        security: [
            {
                apiKeyAuth: [],
            },
        ],
    },
};
const specs = swaggerJsdoc(options);

module.exports = specs;
