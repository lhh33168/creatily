import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
      selector: 'app-address',
      templateUrl: './address.component.html',
      styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

      getaddress : Array<any> = [];

      constructor(private http: HttpService, private confirmServ: NzModalService, private _message: NzMessageService) { }

      ngOnInit() {
          this.getAddressItem();
          console.log(AddressComponent)
      }
      getAddressItem(){
          let params = {};
          this.http.get('get_address',params = {userid:123}).then((res) => { 
              this.getaddress = res['data'].results;
              console.log(this.getaddress)
          })
      }
      // showConfirm = (id) =>{
      //     let http = this.http;
      //     this.confirmServ.confirm({
      //     title  : '您是否确认要删除这项内容',
      //     content: '<b>一些解释</b>',
      //     onOk() {     
      //           let params;
      //           http.post('deletet_address',params = {id:id}).then((res) => { 
      //               console.log(res)
      //           }).then(()=>{
      //               let params = {};
      //               http.get('get_address',params = {userid:123}).then((res) => { 
      //                   getaddress = res['data'].results;
      //               })
      //           })
      //     },
      //     onCancel() {
      //     }
      //   })
      // }
      deleteAddress(id){
          let params;
          this.http.post('deletet_address',params = {id:id}).then((res) => { 
              console.log(res)
              this._message.info('已成功删除地址信息')
          }).then(()=>{
              this.getAddressItem();
          })
      }
      updateAddress(){
         
      }
}
