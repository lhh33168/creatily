import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
      selector: 'app-address',
      templateUrl: './address.component.html',
      styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

      getaddress : Array<any> = [];
      userid: number;

      constructor(private http: HttpService, private confirmServ: NzModalService, private _message: NzMessageService,  private route: ActivatedRoute, private router: Router) { }

      ngOnInit() {
          var userJsonStr = sessionStorage.getItem('userInfo');
          if(userJsonStr){
              var usermessage = JSON.parse(userJsonStr);
              this.userid = usermessage.id;
          }
          if(this.userid){
              this.getAddressItem();            
          }
      }
      getAddressItem(){
          let params = {};
          this.http.get('get_address',params = {userid:this.userid}).then((res) => { 
              if(res['state']==true){
                this.getaddress = res['data']['results'];
                // console.log(res)
              }
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
              // console.log(res)
              this._message.info('已成功删除地址信息')
          }).then(()=>{
              this.getAddressItem();
          })
      }
      updateAddress(id){
          
           this.router.navigate(['newAddress',{id:id}])
      }
}
