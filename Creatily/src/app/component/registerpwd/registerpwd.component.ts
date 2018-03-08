import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerpwd',
  templateUrl: './registerpwd.component.html',
  styleUrls: ['./registerpwd.component.scss']
})
export class RegisterpwdComponent implements OnInit {
  @ViewChild('pwdFocus') pwdfocus;
  @ViewChild('zhuce') zhuce;
  pwdPhone:String = null;
  pwdPassword:String = null;
  jinzhiphone:Boolean = true;
  showPwdB:Boolean = false;
  submitPwd:Boolean = true;
  passShow:String = "password";
  constructor(private http: HttpService, private activatedRoute: ActivatedRoute, private confirmServ: NzModalService, private _message: NzMessageService, private router: Router) { }

  ngAfterViewInit() {
    this.pwdfocus.nativeElement.focus();
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pwdPhone = params['myphone'];
    });
  }
  // 输入密码
  pwdPhoneB(event){
    if (event.target.value.length < 6) {
      this.showPwdB = false;
      this.zhuce.nativeElement.style.color = "#9C9C9C";
      this.submitPwd = true;
    } else {      
      this.showPwdB = true;
      this.submitPwd = false;
      this.zhuce.nativeElement.style.color = "#000000";
    }
  }
  // 切换显示
  showPwdtype(){
    this.passShow = this.passShow == 'password' ? 'text' : 'password';    
  }
  // 清除密码
  clearPwdA(){
    this.pwdPassword = null;
    this.showPwdB = false;
    this.zhuce.nativeElement.style.color = "#9C9C9C";
    this.submitPwd = true;
    this.ngAfterViewInit();
  }
  // 提交注册
  regpwdSubmit(passvalue){
    let passExp = /^\S{6,20}$/;
    let userphone = this.pwdPhone;
    if (!passExp.test(passvalue)){
      this.passError();
      return false;
    }else{
      this.http.post('register',{ "phone": userphone, "password": passvalue}).then((res)=>{
        // console.log(res);
        if (res['state'] == "success") {
          this.passsuccess();
        }else{
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
        $self.pwdPassword = null;
        $self.submitPwd = true;
      }
    });
  }
  passsuccess(){
    let $self = this;
    this.confirmServ.success({
      title: '温馨提示',
      content: '恭喜您注册成功，现在为您跳转到登录页',
      okText: '确定',
      cancelText:'取消',
      onOk() {
        $self.router.navigate(['login'], { queryParams: { myphone: $self.pwdPhone } });
        $self.submitPwd = true;
      },
      onCancel() {
        return false;
      }
    });
  }
  passerror(){
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '网络出错！请重新输入！',
      okText: '确定',
      onOk() {
        $self.clearPwdA();
      }
    });
  }
}
