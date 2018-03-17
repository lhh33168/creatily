import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userset',
  templateUrl: './userset.component.html',
  styleUrls: ['./userset.component.scss']
})
export class UsersetComponent implements OnInit {
  userInfo: string = window.localStorage.getItem('userInfo');
  usersetImg: String = '../../../assets/images/default-user.png';
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.userInfo) {
      const sessionRes = JSON.parse(this.userInfo);
      this.usersetImg = sessionRes['headphoto'];
    }
  }
  tuichu() {
    if (this.userInfo) {
      window.localStorage.removeItem('userInfo');
      this.router.navigate(['home']);
    }
  }

}