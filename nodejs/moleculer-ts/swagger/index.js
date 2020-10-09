const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config');
const swaggerAuth = require('./auth');
const PORT = 3001;

let app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
// process.env.MODE = 'PROD';
if (process.env.MODE === 'PROD') {
    app.use('/api-docs/', swaggerAuth);
}
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Swagger docs server: http://localhost:${PORT}/api-docs/`);
    console.log(`Swagger auth info: ${JSON.stringify(swaggerAuth.user)}`);
});

module.exports = app;
