const db = require('../db/db');
const httpCode = require('./getcode');
const md5 = require('md5');

module.exports = {
	register:function(app){
		app.get('/firstphone', function(request,responer){
			const phone = request.query.phone;
			db.select2(`select * from user where userphone = ${phone}`, function(result){
				responer.send(result.data);
			})
		})
		app.post('/getphoneCode',function(request,responer){
			var phoneVal = request.body.codephone;
			var codeNum = parseInt(Math.random() * 900000 + 100000);
			// console.log("phoneNumber", phoneVal, "codeNum", codeNum);
			// 验证码存数据库
			db.insert(`insert into user (userphone, phonecode) values (${phoneVal} , ${codeNum})`, function (result){
				// if(result.state){
				httpCode(phoneVal, codeNum).then(function(res){
					// console.log(res);
					// responer.send({state:""})
					if(res.respCode==00000){
						responer.send("发送成功");
					}else{
						responer.send("发送失败");							
					}
				});
			});
		})
		app.get('/testCode', (request, responer)=>{
			const phoneval = request.query.phone;
			const codeval = request.query.code;			
			db.select2(`select * from user where userphone = ${phoneval} and phonecode = ${codeval} `, function (result) {
				if (result.data.results.length==0){
					responer.send({ status:"faild"});
				}else{
					// db.update(`UPDATE user SET  phonecode = null WHERE userphone = ${phoneval} `,function(){
					responer.send({status:"success"})
					// })
				}
			});
		})
		app.post('/register', (request, responer) => {
			const zhucePhone = request.body.phone;
			const zhucePwd = request.body.password;
			const md5Pwd = md5(zhucePwd);
			const defaultPhoto = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3987166397,2421475227&fm=27&gp=0.jpg";
			const ramdomName = Math.random().toString(36).substr(2);
			db.update(`UPDATE user SET user_id = "${ramdomName}",password = "${md5Pwd}",headphoto="${defaultPhoto}" WHERE userphone = ${zhucePhone}`, function (res){
				// console.log(res);
				if(res.state){
					db.update(`UPDATE user SET  phonecode = null WHERE userphone = ${zhucePhone} `,function(res){
						if(res.state){
							responer.send({state:"success"});
						}else{
							responer.send({ state: "faild" });							
						}
					})
				}
			})
		});
		app.get('/loginSub', function(request, responer){
			var username = request.query.userphone;
			var password = request.query.password;
			const md5loginPass = md5(password);
			// console.log(username)
			db.select2(`select * from user where userphone=${username} and password="${md5loginPass}"`, function (result) {
				if (result.data.results.length < 0) {
					responer.send({ state: "faild" });
				} else {
					responer.send({ state: "success", data: result.data.results[0]});
				}
				// console.log(result.data)
			})
		})
		// 订单
		app.get('/dingdan',function(request,responer){
			var idxState = request.query.idxState;
			var sql = 'select * from orders'
			if(idxState == 1){
				sql = sql;
			}else if (idxState == 2){
				sql += ' where status = 1';
			}

			db.select2(sql,function(result){
				if(result.data.results.length > 0){
					responer.send({ state: true, data: result.data.results});
				}else{
					responer.send({ state: false });
				}
			})
		})
	}
}
