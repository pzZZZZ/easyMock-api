var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/local';

/**
* 连接
*/
mongoose.connect(DB_URL);

/**
* 连接成功
*/
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
* 连接异常
*/
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});


const ex = function* (next) {
    yield this.render('index', {
        title: 'Hello World test11231!'
    });
}
module.exports = ex;