import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  @ViewChild('regFocus') phone;
  @ViewChild('phoneCodeFocus') code;
  @ViewChild('nextSubmitA') nextBtn;
  codetext: any = "点击获取验证码";
  regPhone: String = null;
  inputCode: String = null;
  regShowA: Boolean = false;
  codeDisabled: Boolean = true;
  nextSubmit: Boolean = true;
  constructor(private http: HttpService, private confirmServ: NzModalService, private router: Router) { }

  // 组件加载完快速获取焦点
  ngAfterViewInit() {
    this.phone.nativeElement.focus();
  }
  phoneClear() {
    this.regPhone = null;
    this.regShowA = false;
  }
  
  // 输入监听值变化
  RegPhoneA(event) {
    this.regShowA = event.target.value.length > 5  ? true : false;
    if (event.target.value.length == 11){
      document.querySelector('.getCode').classList.add("changeCol");
    }else{
      document.querySelector('.getCode').classList.remove("changeCol");
      this.codeDisabled = false;
    }
  }
  
  // 清空输入框
  clearInputPhone(){
    this.regPhone = null;
    this.regShowA = false;
    this.codeDisabled = true;
    document.querySelector('.getCode').classList.remove("changeCol");
  }
  // 正则验证
  phoneExp(phone){
    let phoneExp = /^1[34578]\d{9}$/;
    return !phoneExp.test(phone);
  }
  // 获取验证码及判断
  getCode(regPhone){
    // 正则验证
    
    if (this.phoneExp(regPhone)){
      this.clearInputPhone()
      this.phoneError();
      return false;
    }else{
      this.http.get('firstphone', { "phone": regPhone}).then((res)=>{
        if(res.results.length == 0){
          this.sendCode(regPhone);
          this.code.nativeElement.focus();
        }else{
          this.phoneCunzai();
          return false;
        }
      })
    }
  }
  // 手机号码错误弹窗
  phoneError(){
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '手机号码输入不规范',
      onOk() {
        $self.ngAfterViewInit()
      }
    });
  }
  // 用户存在
  phoneCunzai(){
    let $self = this;
    this.confirmServ.confirm({
      title: '注册失败',
      content: '<strong>该手机号已被注册</strong>',
      okText:'立即登录',
      onOk() {
        $self.router.navigate(['login']);
      },
      onCancel() {
        $self.clearInputPhone();
        $self.ngAfterViewInit();
      }
    });
  }
  // 倒计时
  sendCode(phoneVal){
    let count = 10 ;
    let timer = setInterval(()=>{
      let daoshu = count--;
      this.codetext = `${daoshu}s后重新获取`;
      this.codeDisabled = true;
      if (count<=0){
        this.codetext = "重新获取验证码";
        clearInterval(timer);
        if (this.regPhone!=null){
          this.codeDisabled = false;
        }
      }
    },1000);
    // 将获取手机号码发送后端处理
    this.http.post('getCode',{"phone":phoneVal});
  }

  inputPhoneB(event){
    if (event.target.value.length == 6 && this.regPhone!=null) {
      this.nextBtn.nativeElement.style.color = "#000000";
      this.nextSubmit = false;
    }else{
      this.nextSubmit = true;
      this.nextBtn.nativeElement.style.color = "#9C9C9C"; 
    }
  }
  // 下一步
  regsubmit(phoneval, codeval){
    // console.log(phoneval, codeval);
    if (this.regPhone != null){
      this.http.get('testCode', { "phone": phoneval, "code": codeval }).then((res) => {
        // console.log(res);
        if (res.status == "success") {
          // this.pwdInput = phoneval;
          this.router.navigate(['register'], {queryParams: { myphone: phoneval}});
          this.nextSubmit = true;
        } else {
          this.errorCode();
          return false;
        }
      })
    }else{
      this.phoneError();
      return false;
    }
    
  }
  // 验证码错误
  errorCode(){
    let $self = this;
    this.confirmServ.error({
      title: 'Error',
      content: '该输入的验证码不正确!',
      okText: '确定',
      onOk() {
        $self.clearInputPhone();
        $self.inputCode = null;
      }
    });
  }
}
