var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , cors = require('koa-cors');
var multer = require('koa-multer');
// , koaBody = require('koa-body')({
//   "formLimit": "5mb",
//   "jsonLimit": "5mb",
//   "textLimit": "5mb"
// }),
//  bodyParser = require('koa-bodyparser');
//允许跨域访问

var index = require('./routes/index');
var users = require('./routes/users');
var router = require('koa-router')();
var zzz = require('./middles/index.js');
// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
// app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(cors());
// app.use(bodyParser());

app.use(function* (next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));



// app.use(zzz.zzz)


// routes definition

app.use(index.routes(), index.allowedMethods());
// app.use(multer({ dest: './uploads/'}))
app.use(users.routes(), users.allowedMethods());


// router.post('/users', koaBody,
// function *(next) {
//   console.log(this.request.files)
//   console.log(this.request.body);
//   // => POST body
//   this.body = JSON.stringify(this.request.body, null, 2);
//   this.body = {
//     code:200,
//     msg:'上传成功'
//   }
//   yield next;
// }
// );




app.use(router.routes());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;



