import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../utils/http.service'
import { Router} from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    username:string='';
    password:string='';
    toggle:Boolean=false;

    login(){
        if(this.username && this.password){
            this.toggle=!this.toggle;
            this.http.post(
                "login_cms",
                {user_id:this.username,pwd:this.password}
            ).then(res=>{
                setTimeout(()=>{
                    this.toggle=false;
                },800);
                setTimeout(()=>{
                    if(res["data"] && res["data"].results.length>0){
                        alert("success");
                        sessionStorage.setItem('user_id', JSON.stringify(this.username));
                        this.router.navigate(['/home'],{'queryParams':{'user_id':this.username}});
                    }else{
                        alert("fail");
                    }
                },1000)
            })
        }else{
            alert("fail")
        }

    }
    constructor(
        private http: HttpService,private router: Router
    ) { }

    ngOnInit() {
    }

}
