import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RootRouter} from './router/router';
import {HttpService} from './utils/http.service'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ElModule } from 'element-angular'
import 'element-angular/theme/index.css'


import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    RootRouter,
    HttpModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [UserComponent]
})


export class AppModule { }
