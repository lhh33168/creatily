var db = require('../db/db.js');

module.exports = {
    register:function(_app){
        _app.get('/get_comments',function(_req,_res){
            console.log(_req.query.id);
            var _id = _req.query.id
            db.select2(`SELECT * FROM community where id = ${_id}`,function(res){
                console.log(res);
                _res.send(res);
            })
        });

        _app.post('/add_zan',function(_req,_res){
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
                    _res.send(res);
            });
        });

        _app.post('/add_shoucang',function(_req,_res){
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
                    _res.send(res);
            });
        });   
    }
}