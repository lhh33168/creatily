import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.scss']
})
export class UserorderComponent implements OnInit {
  navActive:number = 1;
  tempArr: Array<any>;
  navList: Array<any> = [
    { navidx: 1, navname: "全部" },
    { navidx: 2, navname: "待付款" },
    { navidx: 3, navname: "待发货" },
    { navidx: 4, navname: "已发货" },
    { navidx: 5, navname: "已完成" }
  ]
  nzShowPagination: Boolean = false;
  dingdanlist:Array<any>;
  constructor(private $http: HttpService ) { }

  ngOnInit() {
    
  }
  dingdan(idx){
    this.navActive = idx;
    this.$http.get('dingdan',{idxState:idx}).then((res)=>{
      this.dingdanlist = res['data'];
    })
  };

  getdingDan(){
    
  }
}
