import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: string = window.sessionStorage.getItem('userInfo');
  userImg: String = '../../../assets/images/default-user.png';
  userName: String;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.userInfo == null) {
      this.router.navigate(['reglogin']);
    } else if (this.userInfo) {
      const sessionRes = JSON.parse(this.userInfo);
      this.userName = sessionRes['username'];
      this.userImg = sessionRes['headphoto'];
    }
  }
}
