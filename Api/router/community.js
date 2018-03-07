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
        });
        
        _app.post('/add_cartcount_1',function(_req,_res){
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
               db.select2(`SELECT * FROM community where cetagory = 'space'`,function(result){
	                console.log(result);
	                _res.send(result);
	            })
                
            });
        });
        _app.post('/add_cartcount_2',function(_req,_res){
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
               db.select2(`SELECT * FROM community where cetagory = 'space'`,function(result){
	                console.log(result);
	                _res.send(result);
	            })
                
            });
        });
        _app.post('/add_cartcount_3',function(_req,_res){
            var id = _req.body.id;
            var dianzan = _req.body.dianzan*1+1;
            db.update(`update community set dianzan = ${dianzan} where id = ${id}`,function(res){
               db.select2(`SELECT * FROM community where cetagory = 'space'`,function(result){
	                console.log(result);
	                _res.send(result);
	            })
                
            });
        })
        
        
    }
}