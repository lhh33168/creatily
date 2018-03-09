import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../utils/http.service';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    userid: number = 123;
    username: string = 'ljt';
    headShow: boolean = true;
    headShow2: boolean = false;
    commentId: number;
    dataset: Array<any> = [];
    groundImg: Array<string> = [];
    userimgurl: string;
    Cname: string;
    fabiao: string;
    pinglun: string;
    dianzan_count: number;
    shoucang_count: number; 
    heightlight1: boolean = false;
    heightlight2: boolean = false;
    status: number;
    status1: number;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpService, private location: Location, private _message: NzMessageService) { }

    ngOnInit(): void{
        this.route.params.subscribe((params) => {
            // console.log(params)
            this.commentId = params['id'];
            // console.log(this.commentId)
        });

        this.http.get(`get_comments?id=` + this.commentId).then((res) => {
            // console.log(res)
            this.dataset = res['data']['results'][0];
            // console.log(this.dataset)
            this.groundImg = this.dataset['imgurl'].split(',') ? this.dataset['imgurl'].split(',') : this.dataset['imgurl'];
            // console.log(this.groundImg)
            this.userimgurl = this.dataset['userimgurl'];
            // console.log(this.userimgurl)
            this.Cname = this.dataset['name'];
            // console.log(this.Cname)
            this.fabiao = this.dataset['fabiao'];
            // console.log(this.fabiao)
            this.pinglun = this.dataset['pinglun'];
            // console.log(this.pinglun)
            this.dianzan_count = this.dataset['dianzan'];
            console.log(this.dianzan_count)
            this.shoucang_count = this.dataset['shoucang'];
            // console.log(this.shoucang_count)
            this.status = this.dataset['status'];
            // console.log(this.status)
            this.status1 = this.dataset['status1'];
            // console.log(this.status1)
            if(this.status == 1){
                this.heightlight1 = true;
            }else{
                this.heightlight1 = false;
            };
            if(this.status1 == 1){
                this.heightlight2 = true;
            }else{
                this.heightlight2 = false;
            }
            
        });

    };

    goBack(){
        this.location.back();
    };

    scroll_c(event){
        // console.log(event.target.scrollTop)
        if(event.target.scrollTop>=100){
            this.headShow = false;
            this.headShow2 = true;
        }else{
            this.headShow = true;
            this.headShow2 = false;
        }
    };

    cancel = function () {
        this._message.info('已取消')
    };

    confirm = () => {
        this._message.info('举报成功')
    };

    add_zan(event){
        console.log(event.target.classList)
        let params;

        this.http.post('add_zan',params = {id:this.commentId,dianzan:this.dianzan_count,status:this.status}).then((res) => {
                this.ngOnInit();
            })

    };

    add_shoucang(event){
        console.log(event.target.classList)
        let params;
        this.http.post('add_shoucang',params = {id:this.commentId,shoucang:this.shoucang_count,status1:this.status1}).then((res) => { 
            this.ngOnInit();
        });
    };

}
