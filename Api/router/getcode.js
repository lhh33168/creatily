var request = require("request");
var md5 = require('md5');

// MD5(ACCOUNT SID + AUTH TOKEN + timestamp)。共32位（小写）。
function getCode(phone){
    var codeApi = "https://api.miaodiyun.com/20150822/industrySMS/sendSMS";
    var date = new Date().getTime();
    var sid = "3c3098bd371647ac8ec866b3e41ae413"
    var autotoken = "....";
    var md5Res = md5(sid + autotoken + date);
    // console.log(date);
    // console.log(md5Res);
    var codeNum = parseInt(Math.random() * 900000 + 100000);
    // 参数
    var codeParams = {
        accountSid: sid,
        to: phone,
        timestamp: date,
        sig: md5Res,
        smsContent: `【创质】尊敬的用户，您的验证码为:${codeNum},请在页面上填写验证码完成验证。(如非本人操作，请尽快检查账号安全)`
    };
    return new Promise((resolve, reject)=>{
        request.post({ url: codeApi, form: codeParams}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }else{
                reject(error);
            }
        })
        // { "respCode": "00000", "respDesc": "请求成功。", "failCount": "0", "failList": [], "smsId": "0fcf7807d7ec48e78cebc1a319bb5173" }
    })
}

module.exports = getCode;