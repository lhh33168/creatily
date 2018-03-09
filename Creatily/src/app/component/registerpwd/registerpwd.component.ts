import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../utils/http.service';

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
  constructor(private http: HttpService, private activatedRoute: ActivatedRoute, private confirmServ: NzModalService) { }

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
        this.submitPwd = true;
      }
    });
    }
}

