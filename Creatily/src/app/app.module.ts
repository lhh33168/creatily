import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeUiModule } from 'ngx-weui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RootRouter } from './router/router';
import { HttpService } from './utils/http.service';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BootpageComponent } from './component/bootpage/bootpage.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterComponent } from './component/register/register.component';
import { RegloginComponent } from './component/reglogin/reglogin.component';
import { GetbackComponent } from './component/getback/getback.component';
import { LoginComponent } from './component/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    BootpageComponent,
    FooterComponent,
    RegisterComponent,
    RegloginComponent,
    GetbackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    WeUiModule.forRoot(),
    BrowserAnimationsModule,
    RootRouter,
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
