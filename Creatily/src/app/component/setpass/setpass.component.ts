import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setpass',
  templateUrl: './setpass.component.html',
  styleUrls: ['./setpass.component.scss']
})
export class SetpassComponent implements OnInit {
  @ViewChild('newpassfocusA') newpwdfocusA;
  @ViewChild('tijiaoset') tijiaoset;
  newpwdPhone: String = null;
  newpwdPassword: String = null;
  jinzhiphone: Boolean = true;
  showPwdB: Boolean = false;
  nextSubmit: Boolean = true;
  passShow: String = "password";
  constructor(
    private http: HttpService, 
    private activatedRoute: ActivatedRoute, 
    private confirmServ: NzModalService, 
    private _message: NzMessageService, 
    private router: Router
  ) { }

  ngAfterViewInit() {
    // console.log(this.newpwdfocusA)
    this.newpwdfocusA.nativeElement.focus();
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.newpwdPhone = params['myphone'];
    });
  }
  // 输入密码
  newpassword(event) {
    if (event.target.value.length < 6) {
      this.showPwdB = false;
      this.tijiaoset.nativeElement.style.color = "#9C9C9C";
      this.nextSubmit = true;
    } else {
      this.showPwdB = true;
      this.nextSubmit = false;
      this.tijiaoset.nativeElement.style.color = "#000000";
    }
  }
  // 切换显示
  newshowPwdtype() {
    this.passShow = this.passShow == 'password' ? 'text' : 'password';
  }
  // 清除密码
  clearPwdA() {
    this.newpwdPassword = null;
    this.showPwdB = false;
    this.tijiaoset.nativeElement.style.color = "#9C9C9C";
    this.nextSubmit = true;
    this.ngAfterViewInit();
  }
  // 提交注册
  submitNewpass(passvalue) {
    // console.log(passvalue);
    let passExp = /^\S{6,20}$/;
    let userphone = this.newpwdPhone;
    if (!passExp.test(passvalue)) {
      this.passError();
      return false;
    } else {
      // console.log(userphone, passvalue);
      this.http.post('changepass', { "newphone": userphone, "newpass": passvalue }).then((res) => {
        // console.log(res);
        if (res['state'] == "success") {
          this.passsuccess();
        } else if (res['newError'] == "newError" || res['newError'] == "faild"){
          this.passerror();
        }
      });
    }
  }
  passError() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '该密码输入不规范,请重新输入',
      onOk() {
        $self.ngAfterViewInit();
        $self.newpwdPassword = null;
        $self.nextSubmit = true;
      }
    });
  }

  passsuccess() {
    let $self = this;
    this.confirmServ.success({
      title: '温馨提示',
      content: '密码更改成功，现在为您跳转登录页!',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        $self.router.navigate(['login']);
        $self.nextSubmit = true;
      },
      onCancel() {
        return false;
      }
    });
  }
  passerror() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '网络出错！稍后再重试！',
      okText: '确定',
      onOk() {
        $self.clearPwdA();
      }
    });
  }

}
