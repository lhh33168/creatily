import { Component, OnInit } from '@angular/core';

import {HttpService} from '../../utils/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
      constructor(private http:HttpService) { };
      selectHome:Array<any>=[];
    selectshow:Array<any>=[];
    selectId:string;

  ngOnInit() {
       this.http.get('listSelect').then((res)=>{
        this.selectHome=res['data']['results']
        console.log( this.selectHome)
     })
    }
    selectList(categoryId){
        console.log(categoryId)
        var s = document.querySelector('.show');
        s['style'].display='none';
        var ss =document.querySelector('.selecttype');
        ss['style'].display='block';
       this.selectId=categoryId;
       console.log(this.selectId)
        this.http.get(`listPass?selectId=`+this.selectId).then((res)=>{
        console.log(res);
        this.selectshow=res['data']['results']
     })
    }
    selector(){
        console.log(666)
        var ss = document.querySelector('.selecttype');
        var s = document.querySelector('.show');
        ss['style'].display='none';
        s['style'].display='block';
        this.http.get('listSelect').then((res)=>{
        console.log(res)
        this.selectHome=res['data']['results']
        console.log( this.selectHome)
         })
    }

}
 


