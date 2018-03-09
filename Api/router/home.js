var db = require('../db/db');

module.exports = {
    register:function(app){
        app.get('/banner',function(request,response){
            db.select('SELECT * FROM `banner`',function(res){
                response.send(res);
            });
        })
        app.get('/tabs', function(req, res){
            var idx = req.query.homecate;
            // console.log(idx)
            var sql = `
            select
                *
            from 
                category a
            INNER JOIN
                catenav b
            INNER JOIN
                goodslist c
                where a.homecate = '${idx}' and a.category=b.cateIndex and b.cateId=c.listsId`;
            db.select(sql, function(data){
                res.send(data);
                // console.log(data)
            })
        });
        app.get('/carousel',function(_req,_res){
            db.select2(`SELECT * FROM goodlist where carousel = 'carousel'`,function(res){
               _res.send(res);
            });
        })
        app.get('/newProduct',function(_req,_res){
            db.select2(`SELECT * FROM goodlist where newproduct = 'newproduct'`,function(res){
               _res.send(res);
            });
        })
        app.get('/showProduct',function(_req,_res){
            db.select2(`SELECT * FROM community where showproduct = 'show'`,function(res){
               _res.send(res);
            });
        })
         app.get('/listSelect', function(_req, _res){
            var sql = `
            select
                SQL_CALC_FOUND_ROWS
                *
            from
                category`  
            db.select(sql, function(res){
                _res.send(res);
            })
        })
         app.get('/listPass', function(_req, _res){
            var categoryId = _req.query.selectId;

            var sql = `
            select
                *
            from      
                goodlist b
                inner join category a on b.categoryId = a.categoryId
            where 
                a.categoryId = ${categoryId}
                `;
            db.select(sql, function(res){
                _res.send(res);
            })
        })
        app.get('/homeShow',function(_req,_res){
            db.select2('SELECT * FROM `goodlist`',function(res){
               _res.send(res);
            });
        })
         app.post('/add_zan',function(_req,_res){
            var id = _req.body.id;
            var status = _req.body.status;
            if(status==0){
                var dianzan = _req.body.dianzan*1+1;
                status=1;
            }else if(status==1){
                var dianzan = _req.body.dianzan*1-1;
                status=0;
            }
 
            db.update(`update community set dianzan = ${dianzan},status = ${status} where id = ${id}`,function(res){
               db.select2(`SELECT * FROM community where showproduct = 'show'`,function(result){
                    console.log(result);
                    _res.send(result);
                })
                
            })
        })
         app.post('/add_cang',function(_req,_res){
            var id = _req.body.id;
            var status1 = _req.body.status1;
            if(status1==0){
                var shoucang = _req.body.shoucang*1+1;
                status1=1;
            }else if(status1==1){
                var shoucang = _req.body.shoucang*1-1;
                status1=0;
            }
            
            
            db.update(`update community set shoucang = ${shoucang},status1 = ${status1} where id = ${id}`,function(res){
               db.select2(`SELECT * FROM community where showproduct = 'show'`,function(result){
                    console.log(result);
                    _res.send(result);
                })
                
            });
        });

    }
}