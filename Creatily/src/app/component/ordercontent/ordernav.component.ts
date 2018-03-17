import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ordercontent',
  templateUrl: './ordernav.component.html',
  styleUrls: ['./ordernav.component.scss']
})
export class OrderContentComponent implements OnInit {
  navid: number;
  userId: string;
  imgres: String = '../../../assets/images/orderdefault.png';
  filterArr: Array<any> = [];
  userInfo: string = window.localStorage.getItem('userInfo');
  navList: Array<any> = [
    { id: 1, navname: '全部' },
    { id: 2, navname: '待付款' },
    { id: 3, navname: '待发货' },
    { id: 4, navname: '已发货' },
    { id: 5, navname: '已完成' }
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private $http: HttpService,
    private confirmServ: NzModalService,
    private _message: NzMessageService
    ) { }
  ngOnInit() {
    if (this.userInfo) {
      const sessionRes = JSON.parse(this.userInfo);
      this.userId = sessionRes['id'];
      this.activatedRoute.params.subscribe((params) => {
        this.navid = params['id'];
        this.getdingDan(this.navid, this.userId);
      });
    }
  }

  getdingDan(idxId, usernameId) {
    this.$http.get('dingdan', { idxState: idxId, usernameIdA: usernameId }).then((res) => {
      // console.log(res);
      if (res['state'] === 'success' || res['state']) {
        // console.log(res);
        const arrFiler = res['data'];
        this.filterArr = this.arrFilter(arrFiler);
      } else if (res['state'] === 'faild') {
        this.filterArr = [];
      } else {
        console.log('服务器获取超时!');
      }
    });
  }
  // 过滤
  arrFilter(arrObj) {
    const arr = [];
    for (let i = 0; i < arrObj.length; i++) {
      let index = -1;
      const alreact = arr.some((Item, j) => {
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
        });
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
    // 返回新数组
    return arr;
  }

  getKeys(item) {
    return Object.keys(item);
  }

  carceldingdan(userId, dingdanNum) {
    const delRes = this.spliceArr(dingdanNum);
    if (delRes === 'success') {
      // 返回最新数组
      this.arrFilter(this.filterArr);
      this.$http.post('deldingdan', { username: userId, goodsnum: dingdanNum }).then((res) => {
        if (res['state'] === 'success') {
          // this.getdingDan();
        }
      });
    }
  }
  // 删除订单封装
  spliceArr(dingNo) {
    const $selfDel = this.filterArr;
    for (let d = 0; d < $selfDel.length; d++) {
      if ($selfDel[d]['ordernumber'] === dingNo) {
        $selfDel.splice(d, 1);
      }
    }
    return 'success';
  }
  // 确认收货
  conmitshouhuo(useid, idNum) {
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
  changgestatus(useid, idNum) {
    const delRes = this.spliceArr(idNum);
    if (delRes === 'success') {
      // 返回最新数组
      this.arrFilter(this.filterArr);
      this.$http.post('commitshouhuo', { username: useid, goodsnum: idNum }).then((res) => {
        if (res['state'] === 'success') {
          // this.getdingDan();
          console.log('OK');
        }
      });
    }
  }
}
