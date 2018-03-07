const db = require('../db/db');
const httpCode = require('./getcode');
const md5 = require('md5');

module.exports = {
	register:function(app){
		app.get('/firstphone',(request,responer)=>{
			const phone = request.query.phone;
			db.select2(`select * from user where userphone = ${phone}`, function(result){
				responer.send(result.data);
			})
		})
		app.post('/getCode',(request,responer)=>{
			const phoneVal = request.body.phone;
			const codeNum = parseInt(Math.random() * 900000 + 100000);
			// 验证码存数据库
			db.insert(`INSERT INTO user (userphone, phonecode) values (${phoneVal} , ${codeNum})`,function(){});
			// 调用第三方接口
			httpCode(phoneVal, codeNum).then((res)=>{
				// console.log(res);
			});
		})
		app.get('/testCode', (request, responer)=>{
			const phoneval = request.query.phone;
			const codeval = request.query.code;			
			db.select2(`select * from user where userphone = ${phoneval} and phonecode = ${codeval} `, function (result) {
				if (result.data.results.length==0){
					responer.send({ status:"faild"});
				}else{
					db.update(`UPDATE user SET  phonecode = null WHERE userphone = ${phoneval} `,function(){
						responer.send({status:"success"})
					})
				}
			})
		})
		app.post('/register', (request, responer) => {
			const zhucePhone = request.body.phone;
			const zhucePwd = request.body.password;
			const md5Pwd = md5(zhucePwd);
			const defaultPhoto = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3987166397,2421475227&fm=27&gp=0.jpg";
			const ramdomName = Math.random().toString(36).substr(2);
			db.update(`UPDATE user SET user_id = ${ramdomName},password = ${md5Pwd},headphoto=${defaultPhoto} WHERE userphone = ${zhucePhone} `, function (res){
				console.log(res);
			})
		})
	}
}
