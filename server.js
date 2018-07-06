// var express=require('express');
var mysql=require('./test.js');
// var app=express();
// var path=require('path');
// app.set('views',path.join(__dirname,'views'));
// app.engine('.html',ejs.__express);
// app.set('view engine','html');
// app.use(express.static(path.join(__dirname,'public')));


// app.get('/',function(req,res){
//     var result =mysql.query('select*from list',function(result){
//         res.render('index',{text:result});
//     });
// });
// app.listen(9090);

var sqlLan="status";
mysql.query(sqlLan,function(res1){
    console.log(res1);
});