var db = require('../db/db')

module.exports = {
	register:function(app){
		app.post('/check_phone',function(req,res){
			db.select2(`select * from user where phone=${req.body.phone}`,function(result){
				res.send(result);
			})
		}),
		app.post('/reg',function(req,res){
			var arr = [req.body.phone,req.body.pwd]
			db.insert(`INSERT INTO user(phone,password) VALUES(?,?)`,arr,function(result){
                res.send(result);
            })
		}),
		app.post('/login',function(req,res){
			db.select2(`select * from user where phone=${req.body.phone} and password="${req.body.pwd}"`,function(result){
				res.send(result);
			})
		}),
		app.get('/collects',function(req,res){
			db.select2(`select * from user where user_id=${req.query.user_id}`,function(result){
				// console.log(result.data.results);
				if(result.data.results[0].collects !='0,'){
				console.log();


					// var usercollects = result.data.results[0].collects.substring(0,result.data.results[0].collects.length-1)
					var usercollects = result.data.results[0].collects.slice(0,-1);

					
					console.log(`select * from goodslist where id in (${usercollects})`)
					db.select2(`select * from goodslist where id in (${usercollects})`,function(result2){
						console.log(result2);
						res.send(result2);
					})
				}else{
					db.select2(`select * from goodslist where id = ''`,function(result2){
						console.log("else");
						res.send(result2);
					})
				}
			})
		}),
		app.post('/save',function(req,res){
			db.update(`UPDATE user SET collects = '${req.body.arr_str}' WHERE user_id = ${req.body.user_id}`,function(result){
				res.send(result);
			})
		}),
		app.post('/paid',function(req,res){
			db.update(`UPDATE orders SET status = 1 WHERE orderid = ${req.body.order_id}`,function(result){
				res.send(result);
			})
		}),
		app.post('/unpaid',function(req,res){
			// console.log(2)
			db.update(`UPDATE orders SET status = 2 WHERE orderid = ${req.body.order_id}`,function(result){
				res.send(result);
			})
		}),
		app.get('/get_unpaid',function(req,res){
			db.select2(`
				SELECT * FROM orders as a,
				orderproduct as b,
				goodslist as c 
				where
				a.userid = ${req.query.user_id}
				 AND status = ${req.query.status}
				 AND a.orderid = b.orderid 
				 AND c.id = b.goodsid

				`,function(result){
				res.send(result);
			})
		})
	}
}
