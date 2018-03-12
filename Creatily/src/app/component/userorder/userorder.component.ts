import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.scss']
})
export class UserorderComponent implements OnInit {
  navActive:number = 1;
  userId: string;
  imgres: string = '../../../assets/img/cart/cartempty.png';
  userInfo: string = window.sessionStorage.getItem('userInfo');
  filterArr: Array<any> = [];
  nzShowPagination: Boolean = false;
  dingdanlist:Array<any>;
  constructor(private $http: HttpService, private router: Router, private confirmServ: NzModalService,
    private _message: NzMessageService) { }

  navList: Array<any> = [
    { navidx: 1, navname: "全部" },
    { navidx: 2, navname: "待付款" },
    { navidx: 3, navname: "待发货" },
    { navidx: 4, navname: "已发货" },
    { navidx: 5, navname: "已完成" }
  ];  

  // 1、
  ngOnInit() {
    if (this.userInfo) {
      const sessionRes = JSON.parse(this.userInfo);
      this.userId = sessionRes['id'];
      // console.log(this.userId);
      this.getdingDan(1, this.userId);

      // 获取参数
      // this.activatedRoute.params.subscribe((params) => {
      //   console.log(params['id']);
      //   this.navActive = params['id'];
      // });
    }
  }

  dingdan(idx,usernameId){
    this.navActive = idx;
    this.getdingDan(idx, this.userId);//
    // console.log(idx);
  };

  // 获取
  // 初始默认1
  getdingDan(idx, name){
    // console.log(idx,name);
    // console.log(idx);
    this.$http.get('dingdan', { idxState: idx, usernameIdA: name}).then((res) => {
      // console.log(res);
      if (res['state']){
        // console.log(res);
        let arrFiler = res['data'];
        this.filterArr = this.arrFilter(arrFiler);

      } else if (res['state'] == 'faild'){
        this.filterArr = [];
      } else {
        console.log("服务器已断开!");
      }
    });
  }
  getKeys(item) {
    return Object.keys(item);
  }
  back(){
    this.router.navigate(['user']);
  }
  // 过滤
  arrFilter(arrObj) {
    let arr = [];
    for (let i = 0; i < arrObj.length; i++) {
      let index = -1;
      let alreact = arr.some((Item, j) => {
        if (arrObj[i].ordernumber === Item.ordernumber) {
          index = j;
          return true;
        }
      });

      if (!alreact) {
        arr.push({
          ordernumber: arrObj[i].ordernumber,
          state: arrObj[i].status,
          userId: arrObj[i].userid,
          orderprice: arrObj[i].orderprice,
          goodsArr: [{ 
            goodsId: arrObj[i].goodsid, 
            goodsName: arrObj[i].proname, 
            goodsImg: arrObj[i].imgurl,
            goodsNum: arrObj[i].count,
            goodsSize: arrObj[i].size,
            goodsColor: arrObj[i].color,
            goodsPrice: arrObj[i].price,
          }]
        })
      } else {
        arr[index].goodsArr.push({
          goodsId: arrObj[i].goodsid,
          goodsName: arrObj[i].proname,
          goodsImg: arrObj[i].imgurl,
          goodsNum: arrObj[i].count,
          goodsSize: arrObj[i].size,
          goodsColor: arrObj[i].color,
          goodsPrice: arrObj[i].price
        });
      }
    }
    return arr;//返回新数组
  }
  // 取消订单
  carceldingdan(userId,dingdanNum){
    let delRes = this.spliceArr(dingdanNum);
    if(delRes == 'success'){
      this.arrFilter(this.filterArr);//返回最新数组
      this.$http.post('deldingdan', { username: userId, goodsnum: dingdanNum }).then((res) => {
        if (res['state'] == 'success') {
          // this.getdingDan();
        }
      });
    }
  }
  // 删除订单封装
  spliceArr(dingNo){
    const $selfDel = this.filterArr;
    for(let d = 0; d<$selfDel.length; d++){
      if ($selfDel[d]['ordernumber'] == dingNo){
        $selfDel.splice(d,1);
      }
    }
    return "success";
  }
  // 确认收货
  conmitshouhuo(useid,idNum){
    const $self = this;
    this.confirmServ.warning({
      title: '温馨提示',
      content: '是否确认已收货?否则后果自负!',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        $self.changgestatus(useid, idNum);
      }
    });


    
  }


  // 更改状态
  changgestatus(useid,idNum){
    let delRes = this.spliceArr(idNum);
    if (delRes == 'success') {
      this.arrFilter(this.filterArr);//返回最新数组
      this.$http.post('commitshouhuo', { username: useid, goodsnum: idNum }).then((res) => {
        if (res['state'] == 'success') {
          // this.getdingDan();
          console.log("OK");
        }
      });
    }
  }
}
