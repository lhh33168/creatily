import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  @ViewChild('regFocus') input;
  @ViewChild('codeFocus') code;
  codetext: any = "点击获取验证码";
  regPhone: String = null;
  regShowA: Boolean = false;
  codeDisabled: Boolean = true;
  regSubmit: Boolean = true;
  constructor(private http: HttpService, private _message: NzMessageService) { }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
  RegPhoneA(event) {
    this.regShowA = event.target.value == '' ? false : true;
  }
  getRegPhone(value){
    let phoneExp = /^1[34578]\d{9}$/;
    if (value == ''){
      this.createMessage('error', '手机号码不能为空!');
      return false;
    }else if(!phoneExp.test(value)){
      // console.log(666);
      this.createMessage('error', '手机号码输入不规范!');
      return false;
    }else{
      document.querySelector('.getCode').classList.add("changeCol");
      this.codeDisabled = false;
      this.regShowA = false;
      this.code.nativeElement.focus();
    }
  }
  getCode(phoneVal){
    let phoneExp = /^1[34578]\d{9}$/;
    let count = 60 ;
    let timer = setInterval(()=>{
      let daoshu = count--;
      this.codetext = `${daoshu}s后重新获取`;
      this.codeDisabled = true;
      if (count<=0){
        this.codetext = "重新获取验证码";
        clearInterval(timer);
        if (phoneExp.test(phoneVal)){
          this.codeDisabled = false;
        }
      }
    },1000);
    // 将获取手机号码发送后端处理
    this.http.post('getCode',{"phone":phoneVal}).then((res)=>{
      // console.log(res);
    })
  }
  createMessage(type, text){
    this._message.create(type, text);
  };

}
