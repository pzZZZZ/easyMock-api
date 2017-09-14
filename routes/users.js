var router = require('koa-router')();
var app = require('koa')()
var path = require('path');
const fs = require('fs');
var multer = require('koa-multer');
var mongoose = require('mongoose')

var context = null;
router.prefix('/upload');


router.post('/', multer({
  dest: './public/images/'
}),
  function* (next) {
    var ctx = this;
    context = this;
    let __id = ctx.req.body._id;
    let _imgPath = `http://10.0.0.77:3000/images/${ctx.req.files.file.name}`;
    connect(__id,_imgPath)
    this.body = {
      path:_imgPath,
      code:200
    }
    // context.body =  {
    //   path:_imgPath
    // };
    // next()
    
  }
);

router.get('/get', function* (next) {
  console.log(this.request)
  this.body = '200'
})
module.exports = router;

var connect = function (uid,_imgPath) {

  const db = mongoose.connect('mongodb://localhost/local', function () {
    hand(db,uid,_imgPath)
  });


}


function hand(db,userid,_imgPath) {
  db.connection.on('error', console.error.bind(console, '数据库连接失败：'));
  db.connection.once('open', function () {
    console.log('数据库连接成功！');
    // 定义一个 Schema 模式
    // new Schema() 中传入一个 JSON 对象，定义属性和属性类型
    let PersonSchema = new mongoose.Schema({
      head_img:String
    });
    // 将该 Schema 发布为 Model
    let PersonModel = mongoose.model('zzzz', PersonSchema, 'users');
    PersonModel.update({ _id:userid}, { $set: { 'head_img': _imgPath } }, function () {
      console.log('修改头像成功')
      
      
    });
    // 拿到了 Model 对象，就可以执行增删改查等操作了
    // 如果要执行查询，需要依赖 Model，当然 Entity 也是可以做到的
    // PersonModel.find(function (err, result) {
    //   // 查询到的所有person
    // });
    // 用 Model 创建 Entity
    // let personEntity = new PersonModel({
    //   name: 'Krouky',
    //   password: '10086'
    // });

    // Entity 是具有具体的数据库操作 CRUD 的
    // 执行完成后，数据库就有该数据了

    // PersonModel.find({ '_id': 'Zildjian' }).select('head_img').exec(function (err, res) {
    //   if (!err) {
    //     console.log(res)
    //     for (let i = 0; i < res.length; i++) {
    //       PersonModel.update({ _id: res[i]._id }, { $set: { name: 'TTT' } }, function () {
    //         console.log(123)
    //       });
    //     }

    //   }
    // });




    // personEntity.save(function (err, result) {

    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(`${result} saved!`);
    //   }
    // });
  });
}