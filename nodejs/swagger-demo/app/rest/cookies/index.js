const express = require('express');

let router = express.Router();

/**
 * @swagger
 * /cookies:
 *    post:
 *      tags:
 *          - My Cookies
 *      summary: This should create a new cookie.
 *      description: Nothing more
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              flavor:
 *                type: string
 *      responses:
 *        200:
 *          description: Receive back flavor and flavor Id.
 */
router.route('').post((req, res) => {
    console.log(req.body);
    let response = {
        body: req.body,
        flavorId: Math.floor(Math.random() * 10),
    };
    res.send(response)
});

module.exports = router;
