import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

      order: Array<any> = [];
      address: Array<any> = [];
      dataCountSetPrice : number = 0;
      multiple: boolean = true;

      constructor(private http: HttpService, private router: Router, private route : ActivatedRoute, private confirmServ: NzModalService) { }

      ngOnInit() {
          let params;
          this.http.get('get_orders',params = {userid:123}).then((res) => { 
              this.order = res['data'].results;
              console.log(this.order)
          }).then(()=>{
              this. getPrice();
          })
          
          this.http.get('get_address',params = {userid:123}).then((res) => {        
              for(let i = 0;i<res['data'].results.length;i++){
                  if(res['data'].results[i].default_address==1){
                      this.address.push(res['data'].results[i]);
                  }
              }
              console.log(this.address);
          })
      }
      deleteOrder(){
         this.http.post('delete_order').then((res) => { 
                  console.log(res)
         })
      }
      getPrice(){
          this.dataCountSetPrice = 0;
          for(let i = 0;i<this.order.length;i++){
             this.dataCountSetPrice += this.order[i].count*this.order[i].price;
          }
          console.log(this.dataCountSetPrice)   
      }
      goToPay(){
          if(this.address.length===0){
               this.error();
          }else if(this.multiple==false){
               this.erroragree();
          }else{
             for(let i =0;i<this.order.length;i++){
                 let params ;
                 this.http.post('delete_cart',params = {indexid:this.order[i].indexid}).then((res) => { 
                      console.log(res)
                 })
                 this.http.post('change_order',params = {indexid:this.order[i].indexid}).then((res) => { 
                      console.log(res)
                 }).then(()=>{
                        this.order = [];
                 })
             }
              this.router.navigate(['payment',this.dataCountSetPrice]);
          }
      }
      error() {
            this.confirmServ.error({
              title: '请填写默认收货地址',
              content: '么么哒！！！'
            });
      }
      erroragree() {
            this.confirmServ.error({
              title: '请同意协议',
              content: '么么哒！！！'
            });
      }
      agree(){
          if(this.multiple){
              this.multiple = false;
          }else{
              this.multiple = true;  
          }
          console.log(this.multiple)
      }
}
