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
            var userid = _req.body.userid;
            var goodsid = _req.body.goodsid;
            var color = _req.body.color;
            var size = _req.body.size;
            var count = _req.body.count;
            var sql;
            if(!color){
                sql = `select * from cart where userid = ${userid} and goodsid = ${goodsid} and size = "${size}"`;
            }else if (!size){
                sql = `select * from cart where userid = ${userid} and goodsid = ${goodsid} and color = "${color}"`;
            }else{
                sql = `select * from cart where userid = ${userid} and goodsid = ${goodsid} and size= "${size}" and color = "${color}"`;
            }
            console.log(sql)
            db.select2(sql,function (res1){
                var _data = res1.data.results[0];
                console.log(_data)
                // _res.send(res)
                var arr =[_req.body.userid,_req.body.count,_req.body.color,_req.body.size,_req.body.goodsid,_req.body.username,_req.body.price,_req.body.proname,_req.body.imgurl];      
                if(!_data){
                    db.insert2(`INSERT INTO cart(userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?)`,arr,function (res){
                        return _res.send(res);
                    })
                    
                }
                else{
                    var indexid = _data.indexid;
                    count = count*1 + _data.count*1;
                    db.update(`update cart set count = ${count} where indexid = ${indexid}`,function(res){
                        return _res.send(res);
                    })
                }
            })

        });


        // _app.post('/add_collect',function(_req,_res){
        //     var userid = _req.body.userid;
        //     var goodsid = _req.body.goodsid;
        //     console.log(`update user set collects=concat(collects,'${goodsid},') where user_id = ${userid}`)
        //     db.update(`update user set collects=concat(collects,'${goodsid},') where user_id = ${userid}`,function(res){
        //         _res.send(res);
        //     })
        // });
        // _app.get('/get_collect',function(_req,_res){
        //     var userid = _req.query.userid;
        //     db.select2(`SELECT * FROM user where user_id = ${userid}`,function(res){
        //         _res.send(res);
        //     })
        // });
        // _app.post('/cancel_collect',function(_req,_res){
        //     var userid = _req.body.userid;
        //     var goodsid = _req.body.goodsid;
        //     db.update(`update user set collects='${goodsid},' where user_id = ${userid}`,function(res){
        //         _res.send(res);
        //     })
        // });
        
    }
}