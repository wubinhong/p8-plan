const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const swaggerAuth = require('./swagger-auth');

// import sub-routers
const iceCreamRouter = require('./rest/ice-cream');
const cookiesRouter = require('./rest/cookies');

let router = express.Router();

router.use('/ice-cream', iceCreamRouter);
router.use('/cookies', cookiesRouter);

router.use('/api-docs', swaggerAuth);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.get('/healthcheck', (req, res) => res.send('OK'));

router.swaggerAuth = swaggerAuth;
module.exports = router;
