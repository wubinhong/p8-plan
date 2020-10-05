const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cors = require('cors')
const routes = require('./app/routes');
const PORT = 3000;

let app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Swagger docs server: http://localhost:${PORT}/api-docs/`)
    console.log(`Swagger auth info: ${JSON.stringify(routes.swaggerAuth.user)}`)
});

module.exports = app;
