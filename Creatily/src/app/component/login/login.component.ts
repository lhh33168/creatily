import { Component,  ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('inputFocus') input;
  inputType: String = 'password';
  inputPhone: String = null;
  inputPass: String = null;
  showA: Boolean = false;
  showB: Boolean = false;
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
  inputPhoneA(event) {
    this.showA = event.target.value == '' ? false : true;
  }
  inputPhoneB(event) {
    this.showB = event.target.value == '' ? false : true;
  }
  showChange(){
    this.inputType = this.inputType == 'password' ? 'text' : 'password';
  }
  showAclear(){
    this.inputPhone = null;
    this.showA = false;
  }
  showBclear() {
    this.inputPass = null;
    this.showB = false;
  }
}
