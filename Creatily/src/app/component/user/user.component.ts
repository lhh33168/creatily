import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: string = window.sessionStorage.getItem("userInfo");
  userImg: string = null;
  userName: string = null; 
  constructor(private router: Router) { }
  // 拦截
  ngOnInit() {
    if (this.userInfo == null) {
      this.router.navigate(['reglogin']);
    }else{
      let sessionRes = JSON.parse(this.userInfo);
      this.userName = sessionRes['username'];
      this.userImg = sessionRes['headphoto'];
    }
  }


}
