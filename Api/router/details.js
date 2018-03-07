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

        _app.get('/getcartslist',function(_req,_res){
            var userid =_req.query.userid;
            var sql =`
                select
                    count(*)
                from
                    cart
                where 
                    userid = ${userid}
                `;
            db.select(sql,function(res){
                _res.send(res)
            })
        });

        _app.post('/add_cart',function(_req,_res){
           var arr =[_req.body.userid,_req.body.count,_req.body.color,_req.body.size,_req.body.goodsid,_req.body.username,_req.body.price,_req.body.proname,_req.body.imgurl]
           console.log(arr)
           // var sql =`INSERT INTO cart(uerid,proid) VALUES(${uid},${_req.body.proid})`

           db.insert(`INSERT INTO cart(userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?)`,arr,function(res){
                _res.send(res);
           })
        });

        // _app.post('/add_cart_order',function(_req,_res){
        //    var arr =[_req.body.userid,_req.body.count,_req.body.color,_req.body.size,_req.body.goodsid,_req.body.username,_req.body.price,_req.body.proname,_req.body.imgurl]
        //    console.log(arr)
           
        //    db.insert(`INSERT INTO order(userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?)`,arr,function(res){
        //         _res.send(res);
        //    })
        // });




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
        
    }
}