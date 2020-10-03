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
    console.log(`Running on port ${PORT}`);
});

module.exports = app;
