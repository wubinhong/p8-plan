const express = require('express');

let router = express.Router();

function randomStr() {
    let r = Math.random().toString(36);
    r = r.substring(2);
    return r;
}

const user = {
    uesrname: 'kevin',
    password: '111111',
    swaggerAuth: randomStr(),
};

router.user = user;

router.route(['', '/']).get((req, res, next) => {
    if (req.cookies['swaggerAuth'] === user.swaggerAuth) {
        console.log(
            `Swagger docs access validated: ${req.cookies['swaggerAuth']} | ${user.swaggerAuth}`
        );
        next();
    } else {
        console.log(
            `Swagger docs auth failed due to unmatching of swaggerAuth: ${req.cookies['swaggerAuth']} | ${user.swaggerAuth}`
        );
        res.sendFile('./views/login-swagger.html', { root: __dirname });
    }
});

router.route('/auth/login').post((req, res) => {
    console.log(
        `Swagger login Info: ${req.originalUrl} | ${JSON.stringify(
            req.body,
            null,
            4
        )}`
    );
    if (req.body['username'] === 'kevin' && req.body['password'] === '111111') {
        let swaggerAuth = randomStr();
        console.log(
            `Swagger validated successfully! System generates new swaggerAuth: ${swaggerAuth}`
        );
        user.swaggerAuth = swaggerAuth;
        res.cookie('swaggerAuth', swaggerAuth);
        res.send({ code: 0 });
    } else {
        res.send({ code: 10000, msg: `Username and password don't matched!` });
    }
});

module.exports = router;
