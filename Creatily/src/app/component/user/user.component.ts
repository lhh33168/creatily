import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  userInfo: string = window.localStorage.getItem('userInfo');
  userImg: String = '../../../assets/images/default-user.png';
  userName: String;
  userlist: Array<any> = [
    { id: 2, name: '待付款', icon: 'icon-icon-test'},
    { id: 3, name: '待发货', icon: 'icon-icon2' },
    { id: 4, name: '已发货', icon: 'icon-yifahuo' },
    { id: 5, name: '已完成', icon: 'icon-wallet-success' }
  ];
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
