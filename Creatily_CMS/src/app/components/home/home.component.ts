import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CommonService} from '../../utils/common.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public user_id:any;
    lanType: string = "cn";
    router_act:Array<string> = [];
    cur_router:string;

    close(){
        sessionStorage.removeItem('user_id');
        this.router.navigate(['']);
    }
    active(event){
        this.router_act=[];
        this.cur_router = this.router.url;
        this.router_act.push(this.router.url);
    }

    constructor(
        public activeRoute:ActivatedRoute,private router: Router,private common:CommonService
    ) { }

    ngOnInit(){
        this.cur_router = this.router.url;
        this.user_id = JSON.parse(sessionStorage.getItem('user_id'));
        if(!this.user_id){
            this.router.navigate(['/']);
        }
        this.activeRoute.queryParams.subscribe(params => {
            //console.log(params);
            //this.user_id = params['user_id'];
        })
    }

    scroll(event){
        //console.log(event.target.scrollTop);
        this.common.opacity = 1 - (event.target.scrollTop/120)*0.1 < 0 ? 0 : 1 - (event.target.scrollTop/120)*0.2 > 1 ? 1 : 1 - (event.target.scrollTop/120)*0.2
    }
    

}
