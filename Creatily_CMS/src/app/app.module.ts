import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RootRouter} from './router/router';
import {HttpService} from './utils/http.service'
import {CommonService} from './utils/common.service'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ElModule } from 'element-angular'
import 'element-angular/theme/index.css'


import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';



import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { GoodsComponent } from './components/goods/goods.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DatagridComponent } from './components/datagrid/datagrid.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AdminComponent,
    GoodsComponent,
    OrdersComponent,
    DatagridComponent
  ],
  imports: [
    RootRouter,
    HttpModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
  ],
  providers: [HttpService,CommonService],
  bootstrap: [AppComponent]
})


export class AppModule { }
