var router = require('koa-router')();
var multer = require('koa-multer');




router.get('/', function* (next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.post('/foo', function* (next) {
  const _this = this;
  const res = _this.response;
  const req = _this.request;

   this.body = '200'

})
module.exports = router;
