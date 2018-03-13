import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
export class ForgetpwdComponent {
  @ViewChild('forgetPhoneFocus') phone;
  @ViewChild('forgetCodeFocus') code;
  @ViewChild('forgetSubmit') nextBtn;
  codetext: any = "点击获取验证码";
  forgetPhone: String = null;
  forgetCode: String = null;
  regShowA: Boolean = false;
  forgetDisabled: Boolean = true;
  nextSubmit: Boolean = true;
  constructor(private http: HttpService, private confirmServ: NzModalService, private router: Router) { }

  // 组件加载完快速获取焦点
  ngAfterViewInit() {
    this.phone.nativeElement.focus();
  }
  phoneClear() {
    this.forgetPhone = null;
    this.regShowA = false;
  }

  // 输入监听值变化
  forgetPhoneA(event) {
    this.regShowA = event.target.value.length > 5 ? true : false;
    if (event.target.value.length == 11) {
      document.querySelector('.getCode').classList.add("changeCol");
      this.forgetDisabled = false;
    } else {
      document.querySelector('.getCode').classList.remove("changeCol");
      this.forgetDisabled = true;
    }
  }

  // 清空输入框
  forgetPhoneClear() {
    this.forgetPhone = null;
    this.regShowA = false;
    this.forgetDisabled = true;
    document.querySelector('.getCode').classList.remove("changeCol");
    this.ngAfterViewInit();
  }
  // 正则验证
  phoneExp(phone) {
    let phoneExp = /^1[34578]\d{9}$/;
    return !phoneExp.test(phone);
  }
  // 获取验证码及判断
  getCodeA(forgetPhone) {
    // 正则验证
    if (this.phoneExp(forgetPhone)) {
      this.forgetPhoneClear()
      this.phoneError();
      return false;
    } else {
      this.http.get('firstphone', { "phone": forgetPhone }).then((res) => {
        // console.log(res['results']);
        if (res['results'].length == 0) {
          this.phoneNotCunzai();
          return false;
        } else if (res['results'].length > 0){
          this.forgetDisabled = true;
          this.code.nativeElement.focus();
          this.sendCode();
          this.http.post('forgetpwd', { "forgetPhone": forgetPhone });
        }else {
          this.netError();
        }
      })
    }
  }
  // 手机号码错误弹窗
  phoneError() {
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
  phoneNotCunzai() {
    let $self = this;
    this.confirmServ.confirm({
      title: '温馨提示',
      content: '<strong>该手机号不存在</strong>',
      okText: '确定',
      onOk() {
        $self.forgetPhoneClear();
        $self.forgetCode = null;
        this.ngAfterViewInit();
      }
    });
  }

  netError() {
    let $self = this;
    this.confirmServ.error({
      title: '温馨提示',
      content: '服务器出错，请稍后重试',
      onOk() {
        $self.forgetPhoneClear();
        $self.forgetCode = null;
      }
    });
  }
  // // 倒计时
  sendCode() {
    let count = 20;
    let phoneVal = this.forgetPhone;
    let timer = setInterval(() => {
      let daoshu = count--;
      this.codetext = `${daoshu}s后重新获取`;
      this.forgetDisabled = true;
      if (count < 0) {
        this.codetext = "点击获取验证码";
        clearInterval(timer);
        if (this.forgetPhone != null && this.forgetCode != null) {
          this.forgetDisabled = false;
          this.nextSubmit = false;
        }
        return false;
      }
    }, 1000);
  }

  forgetCodeA(event) {
    if (event.target.value.length == 6 && this.forgetPhone != null) {
      this.nextBtn.nativeElement.style.color = "#000000";
      this.nextSubmit = false;
    } else {
      this.nextSubmit = true;
      this.nextBtn.nativeElement.style.color = "#9C9C9C";
    }
  }
  // 下一步
  forgetNext(phoneval, codeval) {
    // console.log(phoneval, codeval);
    if (this.forgetPhone != null) {
      this.http.get('testCode', { "phone": phoneval, "code": codeval }).then((res) => {
        // console.log(res);
        if (res['status'] == "success") {
          this.router.navigate(['setpass'], { queryParams: { myphone: phoneval } });
          this.nextSubmit = true;
        } else {
          this.errorCode();
          return false;
        }
      })
    } else {
      this.phoneError();
      return false;
    }

  }
  // 验证码错误
  errorCode() {
    let $self = this;
    this.confirmServ.error({
      title: 'Error',
      content: '该输入的验证码不正确!',
      okText: '确定',
      onOk() {
        $self.phoneError();
        $self.forgetCode = null;
      }
    });
  }
}
