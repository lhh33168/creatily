import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RootRouter} from './router/router';
import {HttpService} from './utils/http.service'


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { CommunityComponent } from './components/community/community.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    CartComponent,
    CommunityComponent,
    DetailsComponent
  ],
  imports: [
    RootRouter,
    BrowserModule,
    HttpModule,
    FormsModule,

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
