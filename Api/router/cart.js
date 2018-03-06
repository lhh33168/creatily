var db = require('../db/db.js');

module.exports = {
    register:function(_app){
        _app.get('/get_hot',function(_req,_res){
            db.select2(`SELECT * FROM goodlist where hot = 'hot'`,function(res){
                console.log(res);
                _res.send(res);
            })
        });
        _app.post('/add_cartcount',function(_req,_res){
            var indexid = _req.body.indexid;
            var qty = _req.body.qty*1+1;
            console.log(`update cart set count = ${qty} where indexid = ${indexid}`)
            db.update(`update cart set count = ${qty} where indexid = ${indexid}`,function(res){
                _res.send(res);
            })
        });
         _app.post('/sub_cartcount',function(_req,_res){
            var indexid = _req.body.indexid;
            if(_req.body.qty*1>1){
                var qty = _req.body.qty*1-1;
                console.log(`update cart set count = ${qty} where indexid = ${indexid}`)
                db.update(`update cart set count = ${qty} where indexid = ${indexid}`,function(res){
                    _res.send(res);
                })
            }else{
                var qty = _req.body.qty;
                db.update(`update cart set count = ${qty} where indexid = ${indexid}`,function(res){
                    _res.send(res);
                })
            }     
        });
        _app.get('/get_address',function(_req,_res){
            var userid = _req.query.userid;
            db.select2(`SELECT * FROM address where user_id = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.post('/add_order',function(_req,_res){
           var arr =[_req.body.indexid,_req.body.userid,_req.body.count,_req.body.color,_req.body.size,_req.body.goodsid,_req.body.username,_req.body.price,_req.body.proname,_req.body.imgurl]
           console.log(arr)
           // var sql =`INSERT INTO cart(uerid,proid) VALUES(${uid},${_req.body.proid})`

           db.insert(`INSERT INTO order(indexid,userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?)`,arr,function(res){
                _res.send(res);
           })
        });
        _app.post('/delete_cart',function(_req,_res){
            var indexid = _req.body.indexid;
            console.log(indexid)
            db.delete(`DELETE FROM cart where indexid = ${indexid}`,function(res){
                _res.send(res);
            })
        });
        _app.get('/get_cart',function(_req,_res){
            let uid =_req.query.uid;
            let sql =`
                select   
                    *
                from
                    cart
                where 
                    userid = ${uid}
                `;
            db.select(sql,function(res){
                _res.send(res)
            })
        })
    }
}