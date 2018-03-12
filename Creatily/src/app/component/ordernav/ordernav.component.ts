import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import global from '../../utils/global';

@Component({
  selector: 'orderNav',
  templateUrl: './ordernav.component.html',
  styleUrls: ['./ordernav.component.scss']
})
export class OrdernavComponent implements OnInit {
  store: Number = 1;
  navActive: number;
  navList: Array<any> = [
    { navidx: 1, navname: "全部" },
    { navidx: 2, navname: "待付款" },
    { navidx: 3, navname: "待发货" },
    { navidx: 4, navname: "已发货" },
    { navidx: 5, navname: "已完成" }
  ];
  constructor(private activatedRoute: ActivatedRoute){}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.activatedRoute.params.subscribe((params) => {
    //   console.log(params['id']);
    //   this.navActive = params['id'];
    // });
  }

  dingdan(idx) {
    this.store = idx;
    // console.log(idx);
  };
}
