import express from 'express';

const PORT = 3000;

function callPerson(name) {
    console.log(`Call ${name}`);
}

var app = express();

callPerson('ffff');

app.get('/', (req, res) => {
    console.log(req.headers);
    let ret = {
        msg: 'success233',
        ts: Math.random() * 100,
    };
    res.send(ret);
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});


// npm install @babel/core @babel/cli @babel/preset-env @babel/node nodemon --save-dev

// npm install babel-cli babel-preset-es2015 nodemon --save-dev

// npm install express --save


