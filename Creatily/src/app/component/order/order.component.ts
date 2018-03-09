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
      ordernumber : number;
      userid : number;
      status : number;

      constructor(private http: HttpService, private router: Router, private route : ActivatedRoute, private confirmServ: NzModalService) { }

      ngOnInit() {
          let params;
          var userJsonStr = sessionStorage.getItem('userInfo');
          var usermessage = JSON.parse(userJsonStr);
          this.userid = usermessage.id;console.log(this.userid)
          if(this.userid){
              this.http.get('get_orders',params = {userid:this.userid}).then((res) => { 
                  if(res['state']==true){
                      this.order = res['data'].results;
                      // console.log(this.order)
                  }
              }).then(()=>{
                  this. getPrice();
              }) 
              this.http.get('get_address',params = {userid:this.userid}).then((res) => {  
                  if(res['state']==true){
                      for(let i = 0;i<res['data'].results.length;i++){
                          if(res['data'].results[i].default_address==1){
                              this.address.push(res['data'].results[i]);
                          }
                      }
                  }
                      // console.log(this.address);
              })
          }
          this.route.params.subscribe((params) =>{
                 
                 this.status = params['status'];
                 console.log( this.status )
          });      
      }
      deleteOrder(){
          let params;
         this.http.post('delete_order',params = {userid:this.userid}).then((res) => { 
                  // console.log(res)
         })
      }
      getPrice(){
          this.dataCountSetPrice = 0;
          for(let i = 0;i<this.order.length;i++){
             this.dataCountSetPrice += this.order[i].count*this.order[i].price;
          }
          // console.log(this.dataCountSetPrice)   
      }
      goToPay(){
          let params;
          this.ordernumber = parseInt(Math.random()*(1000000000-10000000+1)+10000000,10);
          if(this.address.length===0){
               this.error();
          }else if(this.multiple==false){
               this.erroragree();
          }else if(this.order.length===0){
               this.errororder();
          }else if(this.status == 1){
               this.http.post('change_order_detail',params = {ordernumber:this.ordernumber,userid:this.userid}).then((res) => { 
                        console.log(res)
                        this.order = [];
                        this.router.navigate(['payment',this.dataCountSetPrice,res['data'].results[0].ordernumber]);    
                 })
          }else{ 
             // console.log(this.ordernumber)
             for(let i =0;i<this.order.length;i++){
                 let params ;
                 let ordernumber;
                 this.http.post('delete_cart',params = {indexid:this.order[i].indexid}).then((res) => { 
                      // console.log(res)
                 })
                 this.http.post('change_order',params = {indexid:this.order[i].indexid,ordernumber:this.ordernumber,userid:this.userid}).then((res) => { 
                        // console.log(res)
                        this.order = [];
                        this.router.navigate(['payment',this.dataCountSetPrice,res['data'].results[0].ordernumber]);    
                 })
             }
          }
      }
      error(){
            this.confirmServ.info({
              title: '请填写默认收货地址',
              content: '么么哒！！！'
            });
      }
      erroragree() {
            this.confirmServ.info({
              title: '请同意协议',
              content: '么么哒！！！'
            });
      }
      errororder() {
            this.confirmServ.info({
              title: '请添加商品',
              content: '么么哒！！！'
            });
      }
      agree(){
          if(this.multiple){
              this.multiple = false;
          }else{
              this.multiple = true;  
          }
          // console.log(this.multiple)
      }
}
