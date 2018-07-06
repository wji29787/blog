const mysql=require('mysql');
//console.log(mysql); 
// var connection =mysql.createConnection({
//     host :'127.0.0.1',
//     user :'root',
//     password:'123456',
//     database:'blog'
// });
// var aa= connection.connect();//创建连接

// connection.query('SELECT 1 + 1 AS solution',function(err,results,fields){
//     if(err) throw err;
//     console.log(results[0].solution);
// })
// console.log(process.env)

var db={};
db.query=function sqlback(sqllan,fn){
    //connection 操作mysql 的对象
    var connection =mysql.createConnection({
        host :'127.0.0.1',
        user :'root',
        password:'123456',
        database:'blog'
    });
    //connect(callback);
    //判断连接是否成功，失败 打印错误信息，并停止运行
    connection.connect(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    /**
     * query(sql,callback);
     * 发送sql语句，
     * callback :
     * @param err,rows,fields
     * err 错误对象 
     * rows 具体返回结果,正常是一个数组，
     * fields 数组 包含每个数据的解释，属于哪个库哪张表
     */
    var sql=sqllan;//查询命令
    if(!sql) return;
    connection.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        fn(rows,fields);
    });
    //数据库操作完毕关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('连接关闭');
        }
    });
}
module.exports=db;
