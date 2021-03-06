var request = require("request");
var md5 = require('md5');

// MD5(ACCOUNT SID + AUTH TOKEN + timestamp)。共32位（小写）。
function getCode(phone,ramdomCode){
    var codeApi = "https://api.miaodiyun.com/20150822/industrySMS/sendSMS";
    var date = new Date().getTime();
    var sid = "3c3098bd371647ac8ec866b3e41ae413"
    var autotoken = "4ce8aa9736a749ecbaf39d10d6087e64";
    var md5Res = md5(sid + autotoken + date);
    var codeParams = {
        accountSid: sid,
        to: phone,
        timestamp: date,
        sig: md5Res,
        smsContent: `【创质】尊敬的用户，您的验证码为:${ramdomCode},请在页面上填写验证码完成验证。(如非本人操作，请尽快检查账号安全)`
    };
    return new Promise((resolve, reject)=>{
        request.post({ url: codeApi, form: codeParams}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }else{
                reject(error);
            }
        })
    })
}

module.exports = getCode;