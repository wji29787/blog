const Koa=require('koa');
const path=require('path');
//解析提交的表单信息
const bodyParser=require('koa-bodyparser');
//模板引擎
const ejs=require('ejs'); 
//进行数据库操作
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
//默认配置
const config = require('./config/default.js');
//路由
const router=require('koa-router')
const views = require('koa-views')
// 配置静态资源 目录为public
// const koaStatic = require('koa-static')
//缓存文件
const staticCache = require('koa-static-cache')
const app = new Koa();


//session 存储配置
 const sessionMysqlConfig={
     user:config.database.USERNAME,
     password:config.database.PASSWORD,
     database:config.database.DATABASE,
     host:config.database.HOST
 }
 //配置session 中间件
 app.use(session({
     key:'USER_SID',
     store:new MysqlStore(sessionMysqlConfig)
 }));
 //配置静态资源加载中间件

 //缓存
 app.use(staticCache(path.join(__dirname,'./public'),{dynamic:true},{
     maxAge:365*24*60*60
 }));
 app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
  }));
  

  //配置服务端模板渲染引擎中间件
  app.use(views(path.join(__dirname,'./views'),{
      extension:'ejs'
  }));
  app.use(bodyParser({
      formLimit:'1mb'
  }));


  //路由

  app.use(require('./routers/signin.js').routes());
  

  app.listen(3000);

  console.log(`listening on port ${config.port}`);