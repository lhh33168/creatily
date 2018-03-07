var db = require('../db/db.js');

module.exports = {
    register:function(_app){
        _app.get('/space',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'space'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/unboxing',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'unboxing'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/shop',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'shop'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/specia',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'specia'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/brand',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'brand'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/media',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'media'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.get('/jianfan',function(_req,_res){
            db.select2(`SELECT * FROM community where cetagory = 'jianfan'`,function(res){
                console.log(res);
                _res.send(res);
            })
        })
    }
}