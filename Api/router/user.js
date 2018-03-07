var db = require('../db/db');
var httpCode = require('./getcode');

module.exports = {
	register:function(app){
		app.post('/getCode',function(request,responer){
			var phoneVal = request.body.phone;
			httpCode(phoneVal).then((res)=>{
				console.log(res);
			});
		})
	}
}
