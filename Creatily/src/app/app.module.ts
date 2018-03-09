import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeUiModule } from 'ngx-weui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RootRouter } from './router/router';
import { HttpService } from './utils/http.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BootpageComponent } from './component/bootpage/bootpage.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterComponent } from './component/register/register.component';
import { RegloginComponent } from './component/reglogin/reglogin.component';
import { GetbackComponent } from './component/getback/getback.component';
import { LoginComponent } from './component/login/login.component';
import { DetailComponent } from './component/detail/detail.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { PaymentComponent } from './component/payment/payment.component';
import { NewAddressComponent } from './component/new-address/new-address.component';
import { AddressComponent } from './component/address/address.component';

import { CommunityComponent } from './component/community/community.component';

import { CarouselComponent } from './component/home/carousel/carousel.component';
import { NewProductComponent } from './component/home/new-product/new-product.component';
import { ShowProductComponent } from './component/home/show-product/show-product.component';
import { HomeComponent } from './component/home/home.component';



import { CommentComponent } from './component/comment/comment.component';

import { RegisterpwdComponent } from './component/registerpwd/registerpwd.component';
import { UserComponent } from './component/user/user.component';
import { UsersetComponent } from './component/userset/userset.component';
import { UserorderComponent } from './component/userorder/userorder.component';
import { NotificationComponent } from './component/notification/notification.component';
import { SearchComponent } from './component/search/search.component';


import { RangePipe } from '../app/utils/range.pipe';
import { ScrolltoTopComponent } from './component/scrolltotop/scrolltotop.component';

@NgModule({
  declarations: [
    AppComponent,
    BootpageComponent,
    FooterComponent,
    RegisterComponent,
    RegloginComponent,
    GetbackComponent,
    LoginComponent,
    DetailComponent,
    CartComponent,
    OrderComponent,
    PaymentComponent,
    NewAddressComponent,
    AddressComponent,

    CommunityComponent,

    CarouselComponent,
    NewProductComponent,
    ShowProductComponent,
    HomeComponent,
    RegisterpwdComponent,

    CommentComponent,
    RegisterpwdComponent,
    UserComponent,
    UsersetComponent,

    UserorderComponent,

    NotificationComponent,

    SearchComponent,

    RangePipe,

    ScrolltoTopComponent
  ],
  imports: [
    FlexLayoutModule,
    WeUiModule.forRoot(),
    BrowserAnimationsModule,
    RootRouter,
    BrowserModule,
    HttpModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [HttpService, { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 1 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
