var db = require('../db/db.js');

module.exports = {
    register:function(_app){
        _app.get('/get_hot',function(_req,_res){
            db.select2(`SELECT * FROM goodlist where hot = 'hot'`,function(res){
                console.log(res);
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
        _app.get('/get_address',function(_req,_res){
            var userid = _req.query.userid;
            db.select2(`SELECT * FROM address where user_id = ${userid}`,function(res){
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