const express = require('express');

module.exports.addOne = function (req, res) {
    try {
        if (!req.body.flavor) {
            res.send({ error: 'no flavor supplied' });
            return;
        }
        let response = {
            flavor: req.body.flavor,
            flavorId: Math.floor(Math.random() * 10),
        };
        res.send(response);
    } catch (err) {
        res.send({ error: err.message });
    }
};

module.exports.getAll = function (req, res) {
    try {
        let response = [
            {
                flavor: 'strawberry',
                flavorId: 1,
            },
            {
                flavor: 'chocolate',
                flavorId: 2,
            },
        ];
        console.log(`Get all: ${JSON.stringify(response)}`);
        res.send(response);
    } catch (err) {
        res.send({ error: err.message });
    }
};

module.exports.getOne = function (req, res) {
    try {
        console.log('req', req.params.flavorId);
        let response;
        if (req.params.flavorId == 1) {
            response = {
                flavor: 'strawberry',
                flavorId: 1,
            };
        } else if (req.params.flavorId == 2) {
            response = {
                flavor: 'chocolate',
                flavorId: 2,
            };
        } else {
            response = {
                error: 'flavor does not exist',
            };
        }
        res.send(response);
    } catch (err) {
        res.send({ error: err.message });
    }
};
