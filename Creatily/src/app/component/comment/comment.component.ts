import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../utils/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    headShow: boolean = true;
    commentId: number;
    dataset: Array<any> = [];
    groundImg: Array<string> = [];
    userimgurl: string;
    Cname: string;
    fabiao: string;
    pinglun: string;
    dianzan_count: number;
    shoucang_count: number; 

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpService, private location: Location) { }

    ngOnInit(): void{
        this.route.params.subscribe((params) => {
            // console.log(params)
            this.commentId = params['id'];
            // console.log(this.commentId)
        });

        this.http.get(`get_comments?id=` + this.commentId).then((res) => {
            // console.log(res)
            this.dataset = res['data']['results'][0];
            console.log(this.dataset)
            this.groundImg = this.dataset['imgurl'].split(',') ? this.dataset['imgurl'].split(',') : this.dataset['imgurl'];
            console.log(this.groundImg)
            this.userimgurl = this.dataset['userimgurl'];
            console.log(this.userimgurl)
            this.Cname = this.dataset['name'];
            console.log(this.Cname)
            this.fabiao = this.dataset['fabiao'];
            console.log(this.fabiao)
            this.pinglun = this.dataset['pinglun'];
            console.log(this.pinglun)
            this.dianzan_count = this.dataset['dianzan'];
            console.log(this.dianzan_count)
            this.shoucang_count = this.dataset['shoucang'];
            console.log(this.shoucang_count)
        });
    }

}
