import { NgModule } from '@angular/core';
import { HomeComponent }   from '../component/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
const routes: Routes = [
    { path: '', component: HomeComponent }
];
@NgModule({
  imports: [
     CommonModule,RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class LazyModule { }
