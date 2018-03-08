var db = require('../db/db')

module.exports = {
	register:function(app){
		//admin
		app.post('/add_all',function(req,res){
			let arr = Object.keys(req.body);
			let key = '';
			let value = [];
			for(let i=0;i<arr.length;i++){
				key+=","+arr[i];
				value.push(req.body[arr[i]]);
			}
			key = key.slice(1);
			db.insert(`INSERT INTO user(${key}) VALUES(?,?)`,value,function(result){
                res.send(result);
            })
		}),
		app.post('/delete_admin',function(req,res){
			db.delete(`DELETE FROM user WHERE user_id = "${req.body.key}"`,function(result){
				res.send(result);
			})
		}),
		app.post('/delete_all',function(req,res){
			let str = req.body.key_str.slice(1);
			db.delete(`DELETE FROM user WHERE user_id in (${str})`,function(result){
				res.send(result);
			})
		}),
		app.post('/update_all',function(req,res){
			let arr = Object.keys(req.body);
			let str = '';
			for(let i=0;i<arr.length;i++){
				if(arr[i] == "index_id"){
					continue;
				}
				str+=","+arr[i]+"="+req.body[arr[i]];
			}
			str = str.slice(1);
			db.update(`UPDATE user SET ${str} WHERE index_id = ${req.body.index_id}`,function(result){
				res.send(result);
			})
		}),
		app.get('/selete_all',function(req,res){
			db.select2(`SELECT * FROM user WHERE CONCAT(${req.query.key}) LIKE "%${req.query.data}%"`,function(result){
				res.send(result);
			})
		}),
		app.get('/get_admin',function(req,res){
			db.select2(`select * from user`,function(result){
				res.send(result);
			})
		}),
		//分页
		app.get('/get_admin_page',function(req,res){
			db.select2(`select SQL_CALC_FOUND_ROWS * from user limit ${(req.query._page-1)*req.query._page},${req.query._qty};SELECT FOUND_ROWS() as rowsCount;`,function(result){
				res.send(result);
			})
		}),
		//登陆
		app.post('/login_cms',function(req,res){
			db.select2(`select * from user where user_id="${req.body.user_id}" and password="${req.body.pwd}"`,function(result){
				res.send(result);
			})
		}),

		// goods
		app.get('/get_goods',function(req,res){
			db.select2(`select * from goodlist`,function(result){
				res.send(result);
			})
		}),
		app.get('/get_goods_page',function(req,res){
			db.select2(`select SQL_CALC_FOUND_ROWS * from goodlist limit ${(req.query._page-1)*req.query._page},${req.query._qty};SELECT FOUND_ROWS() as rowsCount;`,function(result){
				res.send(result);
			})
		}),
		app.post('/delete_goods',function(req,res){
			db.delete(`DELETE FROM goodlist WHERE id = "${req.body.key}"`,function(result){
				res.send(result);
			})
		}),
		app.post('/delete_all_goods',function(req,res){
			let str = req.body.key_str.slice(1);
			db.delete(`DELETE FROM goodlist WHERE id in (${str})`,function(result){
				res.send(result);
			})
		}),
		app.post('/update_all_goods',function(req,res){
			let arr = Object.keys(req.body);
			let str = '';
			for(let i=0;i<arr.length;i++){
				if(arr[i] == "id"){
					continue;
				}
				str+=","+arr[i]+"="+"'"+req.body[arr[i]]+"'";
			}
			str = str.slice(1);
			db.update(`UPDATE goodlist SET ${str} WHERE id = ${req.body.id}`,function(result){
				res.send(result);
			})
		}),
		app.post('/add_goods',function(req,res){
			let arr = Object.keys(req.body);
			let key = '';
			let value = [];
			for(let i=0;i<arr.length;i++){
				key+=","+arr[i];
				value.push(req.body[arr[i]]);
			}
			key = key.slice(1);
			db.insert(`INSERT INTO goodlist(${key}) VALUES(?,?)`,value,function(result){
                res.send(result);
            })
		}),
		app.get('/selete_goods',function(req,res){
			db.select2(`SELECT * FROM goodlist WHERE CONCAT(${req.query.key}) LIKE "%${req.query.data}%"`,function(result){
				res.send(result);
			})
		}),
		app.get('/selete_all_goods',function(req,res){
			db.select2(`SELECT * FROM goodlist WHERE CONCAT(${req.query.key}) LIKE "%${req.query.data}%"`,function(result){
				res.send(result);
			})
		})
	}
}
