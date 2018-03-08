import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
      selector: 'app-new-address',
      templateUrl: './new-address.component.html',
      styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

      multiple: boolean = false;
      /************************* 省级联动 ********************************/
      citys: any;                                             //省级 数据
      city1Array: any = [];
      city1NgModel: any;
      city2Array: any = [];
      city2NgModel: any;
      city2Disabled: boolean = true;
      city3Array: any = [];
      city3NgModel: any;
      city3Disabled: boolean = true;
      //获取省市区县数据
      getCitys() {
        this.http.get('http://passer-by.com/data_location/list.json')
          .then(citys => {
              this.citys = citys;
              // console.log(this.citys);
            }
          )
          .then(
            () => {
              for (let i in  this.citys) {
                if (parseInt(i) % 10000 === 0) {
                  this.city1Array.push({
                    label: this.citys[i],
                    value: i
                  });
                }

              }
            }
          );
      }

      //省级 或 直辖市 级 下拉框change 事件
      city1onChange() {
        this.city2Array = [];console.log(66)
        for (let i in  this.citys) {
          if (parseInt(i.substring(0, 2)) == this.city1NgModel.substring(0, 2)) {
            if (parseInt(i) % 100 === 0 && parseInt(i) % 10000 != 0) {
              this.city2Array.push({
                label: this.citys[i],
                value: i
              });
            }
            if (i.substring(0, 2) == '11' || i.substring(0, 2) == '12' || i.substring(0, 2) == '82' || i.substring(0, 2) == '81'
              || i.substring(0, 2) == '50' || i.substring(0, 2) == '31'
            ) {
              if (parseInt(i) % 10000 != 0) {
                this.city2Array.push({
                  label: this.citys[i],
                  value: i
                });
              }
            }
          }
        }
        if (this.city2Array.length == 0) {
          this.city2Disabled = true;
          this.city3Disabled = true;
          this.city3Array = [];
        } else {
          this.city2Disabled = false;
          this.city3Disabled = true;
          this.city3Array = [];
        }
      }

      //第二个个下拉框change 事件
      city2onChange() {
        this.city3Array = [];
        for (let i in  this.citys) {
          if (parseInt(i.substring(0, 4)) == this.city2NgModel / 100) {
            if (parseInt(i) % 100 != 0) {
              this.city3Array.push({
                label: this.citys[i],
                value: i
              });
            }
          }
        }
        if (this.city3Array.length == 0) {
          this.city3Disabled = true;
        } else {
          this.city3Disabled = false;
        }
      }


      constructor(private http: HttpService, private confirmServ: NzModalService) { }

      ngOnInit() {
          this.getCitys();
      }

      getKeys(item){
          return Object.keys(item);
      }
      success() {
            this.confirmServ.success({
              title: '添加收货地址成功',
              content: '造作去吧！！！'
            });
      }
      error() {
            this.confirmServ.error({
              title: '请输入完整收货人信息',
              content: '么么哒！！！'
            });
      }
      info(contentTpl) {
        this.confirmServ.info({
          title: '这是一条通知信息',
          content: contentTpl
        });
      }
      warning() {
        this.confirmServ.warning({
          title: '这是一条警告信息',
          content: '一些附加信息一些附加信息一些附加信息'
        });
      }
      addAddress(name,phone,address,city1NgModel){
          let params;
          if(this.multiple){
              if(!name || !phone || !city1NgModel || !address){
                  this.error();
              }else{
                  this.http.post('add_address',params = {userid:123,name:name,phone:phone,address:address}).then((res) => { 
                      this.success();          
                  })         
              }
          }else{
              if(!name || !phone || !city1NgModel || !address){
                  this.error();
              }else{
                  this.http.post('add_address_def',params = {userid:123,name:name,phone:phone,address:address}).then((res) => { 
                      this.success();         
                  })         
              }
          }
      }
      defaultAddress(){
          if(this.multiple){
              this.multiple = false;
          }else{
              this.multiple = true;  
          }
      }

}

