const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path')

function getApis(relativePaths) {
    return relativePaths.map(p => path.join(__dirname, p))
}

const options = {
    // List of files to be processed.
    apis: getApis(['rest/*/index.js']),
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    basePath: '/',
    swaggerDefinition: {
        info: {
            title: 'swagger-express-jsdoc', // Title (required)
            version: '2.0', // Version (required)
        },
    },
};
const specs = swaggerJsdoc(options);

module.exports = specs;
