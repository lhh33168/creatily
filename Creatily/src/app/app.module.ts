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
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AddressComponent } from './component/address/address.component';
import { NewAddressComponent } from './component/new-address/new-address.component';


@NgModule({
  declarations: [
    AppComponent,
    BootpageComponent,
    FooterComponent,
    CartComponent,
    OrderComponent,
    PaymentComponent,
    AddressComponent,
    NewAddressComponent,

  ],
  imports: [
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
