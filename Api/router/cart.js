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
        _app.get('/get_compile_address',function(_req,_res){
            var id = _req.query.id;
            db.select2(`SELECT * FROM address where id = ${id}`,function(res){
                _res.send(res);
            })
        });
        _app.get('/get_address',function(_req,_res){
            var userid = _req.query.userid;
            db.select2(`SELECT * FROM address where user_id = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.post('/add_address_def',function(_req,_res){
           var userid = _req.body.userid;

           var arr =[_req.body.name,_req.body.userid,_req.body.phone,_req.body.address,1]
           console.log(arr)

           db.update(`update address set default_address = 0 where user_id = ${userid} && default_address = 1`,function(res){
                    db.insert(`INSERT INTO address (name,user_id,phone,address,default_address) VALUES(?,?,?,?,?)`,arr,function(res2){
                    _res.send(res2);
               })       
           })
           
        });
        _app.post('/add_address',function(_req,_res){
           var arr =[_req.body.name,_req.body.userid,_req.body.phone,_req.body.address]
           console.log(arr)

           db.insert(`INSERT INTO address (name,user_id,phone,address) VALUES(?,?,?,?)`,arr,function(res){
                _res.send(res);
           })                
        });
        _app.post('/deletet_address',function(_req,_res){
            var id = _req.body.id;
            db.delete(`DELETE FROM address where id = ${id}`,function(res){
                _res.send(res);
            })
        });
        _app.post('/update_address_def',function(_req,_res){
            var id = _req.body.id;
            var userid = _req.body.userid;
            var name = _req.body.name;
            var phone = _req.body.phone;
            var address = _req.body.address;

            db.update(`update address set default_address = 0 where user_id = ${userid} `,function(res){
                    db.update(`update address set name = "${name}" , phone = "${phone}" , address = "${address}" , default_address = 1  where id = ${id}`,function(res2){
                    _res.send(res2);
                })       
            })
        });
        _app.post('/update_address',function(_req,_res){
            var id = _req.body.id;
            var userid = _req.body.userid;
            var name = _req.body.name;
            var phone = _req.body.phone;
            var address = _req.body.address;
            db.update(`update address set name = "${name}" , phone = "${phone}" , address = "${address}" ,default_address = 0  where id = ${id}`,function(res2){
                    _res.send(res2);
                  
            })
        });
        _app.post('/add_order',function(_req,_res){
           var arr =[_req.body.indexid,_req.body.userid,_req.body.count,_req.body.color,_req.body.size,_req.body.goodsid,_req.body.username,_req.body.price,_req.body.proname,_req.body.imgurl]
           console.log(arr)
           // var sql =`INSERT INTO cart(uerid,proid) VALUES(${uid},${_req.body.proid})`

           db.insert(`INSERT INTO orders (indexid,userid,count,color,size,goodsid,username,price,proname,imgurl) VALUES(?,?,?,?,?,?,?,?,?,?)`,arr,function(res){
                _res.send(res);
           })
           // var arr = [_req.body.indexid]
           // db.insert(`INSERT INTO orders (indexid) VALUES(?)`,arr,function(res){
           //      _res.send(res);
           // })
        });
        // app.get('/get_order',function(req,res){
        //     db.select2(`select * from user where userid=${req.query.userid}`,function(result){
        //         // console.log(result.data.results);
        //         if(result.data.results[0].indexid !='0,'){
        //         console.log();


        //             // var usercollects = result.data.results[0].collects.substring(0,result.data.results[0].collects.length-1)
        //             var indexids = result.data.results[0].indexid.slice(0,-1);

                    
        //             console.log(`select * from cart where id in (${indexids})`)
        //             db.select2(`select * from cart where id in (${indexids})`,function(result2){
        //                 console.log(result2);
        //                 res.send(result2);
        //             })
        //         }else{
        //             db.select2(`select * from cart where id = ''`,function(result2){
        //                 console.log("else");
        //                 res.send(result2);
        //             })
        //         }
        //     })
        // }),
        _app.get('/get_orders',function(req,res){
            var userid = req.query.userid;
            db.select2(`select * from orders where status = 0 && userid = ${userid}`,function(result){
                console.log(result.data.results);
                res.send(result);  
            })
        });
        _app.post('/delete_order',function(_req,_res){
            var userid = _req.body.userid;
            db.delete(`DELETE FROM orders where status = 0 && userid = ${userid}`,function(res){
                _res.send(res);
            })
        });
        _app.post('/change_order',function(_req,_res){
            var indexid = _req.body.indexid;
            var ordernumber = _req.body.ordernumber;
            console.log(ordernumber)
            db.update(`update orders set status = 1 where indexid = ${indexid}`,function(res){     
                db.update(`update orders set ordernumber = ${ordernumber} where indexid = ${indexid} `,function(res2){  
                        db.select2(`select * from orders where status = 1 && indexid = ${indexid}`,function(result){
                            _res.send(result)
                    })  
                })
            })
        });
        _app.post('/change_order_detail',function(_req,_res){
            var userid = _req.body.userid;
            var ordernumber = _req.body.ordernumber;
            console.log(ordernumber)
            db.update(`update orders set ordernumber = ${ordernumber} where status = 0 && userid = ${userid}`,function(res){ 
                    db.select2(`select * from orders where status = 0 && userid = ${userid}`,function(result){
                        _res.send(result)
                         db.update(`update orders set status = 1 where status = 0 && userid = ${userid} `,function(res2){
                    })  
                })
            })
        });
        _app.post('/payment_order',function(_req,_res){
            var ordernumber = _req.body.ordernumber;
          
            db.update(`update orders set status = 2 where ordernumber = ${ordernumber} `,function(res){  
                _res.send(res)
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
            let userid =_req.query.userid;
            let sql =`
                select   
                    *
                from
                    cart
                where 
                    userid = ${userid}
                `;
            db.select2(sql,function(res){
                _res.send(res)
            })
        })
    }
}