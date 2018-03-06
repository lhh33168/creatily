var db = require('../db/db.js');

module.exports = {
    register:function(_app){
        _app.get('/get_details',function(_req,_res){
            // console.log(_req.query.id);
            var _id = _req.query.id
            db.select2(`SELECT * FROM goodlist where id = ${_id}`,function(res){
                console.log(res);
                _res.send(res);
            })
        });

        _app.get('/add_cart',function(_req,_res){
           var arr =[_req.query.userid,_req.query.count,_req.query.color,_req.query.size,_req.query.goodsid,_req.query.username,_req.query.price,_req.query.proname,_req.query.imgurl]
           console.log(arr)
           // var sql =`INSERT INTO cart(uerid,proid) VALUES(${uid},${_req.body.proid})`

           db.insert(`INSERT INTO cart(userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?)`,arr,function(res){
                _res.send(res);
           })
        });

        _app.post('/add_collect',function(_req,_res){
            var userid = _req.body.userid;
            var goodsid = _req.body.goodsid;
            console.log(`update user set collects=concat(collects,'${goodsid},') where user_id = ${userid}`)
            db.update(`update user set collects=concat(collects,'${goodsid},') where user_id = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.get('/get_collect',function(_req,_res){
            var userid = _req.query.userid;
            db.select2(`SELECT * FROM user where user_id = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.post('/cancel_collect',function(_req,_res){
            var userid = _req.body.userid;
            var goodsid = _req.body.goodsid;
            db.update(`update user set collects='${goodsid},' where user_id = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.get('/getcartslist',function(_req,_res){
            let uid =_req.query.uid;
            let sql =`
                select
                    c.*,
                    u.phone,
                    g.*
                from
                    cart c
                    inner join user u on c.userid = u.user_id
                    inner join goodslist g on c.goodsid =g.id
                where 
                    c.userid = ${uid}
                `;
            db.select(sql,function(res){
                _res.send(res)
            })
        })
    }
}