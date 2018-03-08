import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('loginFocus') loginFocus;
  @ViewChild('loginSubmit') loginSubmit;
  @ViewChild('loginpassFocus') loginpassFocus;
  loginType: String = 'password';
  loginphone: String = null;
  loginpass : String = null;
  loginshowA : Boolean = false;
  loginshowB : Boolean = false;
  logindisable:Boolean = true;

  constructor(
    private http: HttpService, 
    private activatedRoute: ActivatedRoute,
    private confirmServ: NzModalService, 
    private _message: NzMessageService,
    private router: Router
  ){ }
  ngAfterViewInit() {
    if (this.loginphone!=null){
      this.loginpassFocus.nativeElement.focus();
    }else{
      this.loginFocus.nativeElement.focus();
    }
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.loginphone = params['myphone'];
    });
  }
  loginphoneInput(event){
    this.loginshowA = event.target.value.length > 5 ? true : false;
  }
  loginpassInput(event){
    this.loginshowB = event.target.value.length > 5 ? true : false;
    if (event.target.value.length < 6) {
      this.logindisable = true;
      this.loginSubmit.nativeElement.style.color = "#9C9C9C";
    } else {
      this.logindisable = false;
      this.loginSubmit.nativeElement.style.color = "#000000";
    }
  }
  // 清除
  loginPhoneclear(){
    this.loginphone = null;
    this.loginshowA = true;
    this.ngAfterViewInit();
    this.logindisable = true;
    this.loginSubmit.nativeElement.style.color = "#9C9C9C";
  }
  loginPassclear(){
    this.loginpass = null;
    this.loginshowB = false;
    this.loginpassFocus.nativeElement.focus();
    this.logindisable = true;
    this.loginSubmit.nativeElement.style.color = "#9C9C9C";
  }

  loginpassshow() {
    this.loginType = this.loginType == 'password' ? 'text' : 'password';
  }

  loginsubmit(phone,password){
    let phoneExp = /^1[34578]\d{9}$/;
    let passExp = /^\S{6,20}$/;
    if(!phoneExp.test(phone)){
      this.phoneError();
      return false;
    } else if (!passExp.test(password)){
      this.passError();
      return false;
    } else {
      this.logindisable = true;
      this.http.get('loginSub', { "userphone": phone, "password": password }).then((res) => {
        if (res['state'] == "success") {
          console.log(res['data']['index_id'], res['data']['userphone']);
          // let resdata = res['data'][0]; 
          window.sessionStorage.setItem("userInfo", JSON.stringify({ 
            "id": res['data']['index_id'], 
            "username": res['data']['user_id'],
            "userphone":res['data']['userphone'],
            "headphoto": res['data']['headphoto'],
          }));
          this.loginsuccess();
        } else {
          this.loginerror();
        }
      });
    }
  }
  
  loginsuccess(){
    let $self = this;
    this.confirmServ.success({
      title: '温馨提示',
      content: '恭喜您登录成功，现在为您跳转到登录页',
      okText: '确定',
      onOk() {
        $self.router.navigate(['user']);
      }
    });
  }
  // 密码出错
  passError() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '该密码输入不规范,请重新输入',
      okText: '确定',
      onOk() {
        $self.ngAfterViewInit();
        $self.loginpass = null;
        $self.logindisable = true;
      }
    });
  }
  phoneError() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '手机号码输入不规范',
      okText: '确定',
      onOk() {
        $self.loginphone = null;
        $self.logindisable = true;
        $self.ngAfterViewInit();
      }
    });
  }

  loginerror() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '密码错误，请重新登录!',
      okText: '确定',
      onOk() {
        $self.loginpass = null;
        $self.logindisable = true;
        $self.ngAfterViewInit();
      }
    });
  }
}
