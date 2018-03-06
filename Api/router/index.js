var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var path = require('path');

var home = require('./home');
var user = require('./user');
var details = require('./details');
var cart = require('./cart')





app.use(bodyparser.urlencoded({
	extended: false
}));


module.exports = {

    start:function(_port){
        app.all('*', function (req, res, next) {

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", ' 3.2.1');
            app.use(express.static(path.resolve(__dirname,'../')));
            if (req.method == "OPTIONS") {
                res.sendStatus(200);
            } else {
                next();
            }

        });  
        home.register(app),
        user.register(app),
        details.register(app);
        cart.register(app);
        app.listen(_port,function(){
                console.log("server:连接成功!");
        })
       
    }
}

       
   

