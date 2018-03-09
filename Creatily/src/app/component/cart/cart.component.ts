import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
      selector: 'app-cart',
      templateUrl: './cart.component.html',
      styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

      carthot: Array<any> = [];
      currentTrIndexs: Array<number> = [];
      dataset: Array<any> = [];
      cartItem: Array<any> = [];
      dataCountSet: Array<any> = [];
      dataCountSetPrice : number = 0;
      userid: number;

      constructor(private http: HttpService, private route: ActivatedRoute, private router: Router, private confirmServ: NzModalService) { }

      ngOnInit() {
          var userJsonStr = sessionStorage.getItem('userInfo');
          if(userJsonStr){
              var usermessage = JSON.parse(userJsonStr);
              this.userid = usermessage.id;
          }
          this.http.get('get_hot').then((res) => { 
              this.carthot = res['data'].results;
          })
          if(this.userid){
              this.getCartItem();
          }
      }
      getCartItem(){
          let params = {}
          this.http.get('get_cart',params = {userid:this.userid}).then((res) => { 
              if(res['state']==true){
                  this.cartItem = res['data']['results'];
                  this.dataset = res['data']['results'];
                  // console.log(res)   
              }
              
           })    
      }
      getCartItem1(){
          let params = {}
          if(this.cartItem.length>1){
              this.http.get('get_cart',params = {userid:this.userid}).then((res) => { 
                  this.cartItem = res['data'].results;
                  this.dataset = res['data'].results;
                  // console.log(res)
              })    
          }else{
              this.cartItem = [];
              this.dataset = [];
          }
          // console.log(this.cartItem.length)
      }
      getPrice(){
              this.dataCountSetPrice = 0;
              for(let i = 0;i<this.dataCountSet.length;i++){
                 this.dataCountSetPrice += this.dataCountSet[i].count*this.dataCountSet[i].price;
              }
              // console.log(this.dataCountSetPrice)   
      }
      getKeys(item){
            return Object.keys(item);
      }
      selectTr(_idx,_obj){
            // console.log(_obj,_idx)
            // console.log(this.dataCountSet)
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
                this.dataCountSet.splice(this.dataCountSet.indexOf(_obj), 1);
                this.getPrice();
            } else {
                this.currentTrIndexs.push(_idx);
                this.dataCountSet.push(_obj);
                this.getPrice();
            }
            this.getCartItem();
      }
      selectTrSingle(_idx,_obj){
            // console.log(_obj,_idx)
            // console.log(this.dataCountSet)
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.dataCountSet.splice(this.currentTrIndexs.indexOf(_idx) , 1 , _obj);
                this.getPrice();
            } 
               
      }
      selectAll(){
            if(this.currentTrIndexs.length != this.dataset.length){
                this.currentTrIndexs = [];
                this.dataCountSet = this.dataset;
                for(let i = 0; i < this.dataset.length; i++){
                    this.currentTrIndexs.push(i);
                }
                this.getPrice();
            } else {
                this.currentTrIndexs = [];
                this.dataCountSet = [];
                this.getPrice();
            }
     }
     deleteCart(indexid){
         let params;
         this.http.post('delete_cart',params = {indexid:indexid}).then((res) => { 
              // console.log(res)
              this.getCartItem1();
              this.success(); 
          })
     }
     stockCountAdd(indexid,qty,price,_idx,_obj){
         let params;
         _obj.count += 1;
         this.selectTrSingle(_idx,_obj);
         this.http.post('add_cartcount',params = {indexid:indexid,qty:qty}).then((res) => { 
              // console.log(res)
              if(this.dataCountSetPrice != 0 && this.currentTrIndexs.indexOf(_idx) > -1){
                  this.dataCountSetPrice = this.dataCountSetPrice-price*1
                  this.dataCountSetPrice += price*1 
              }
          }).then(()=>{
              this.getCartItem();
         })
     }
     stockCountSub(indexid,qty,price,_idx,_obj){
         if(_obj.count>1){
             _obj.count -= 1;
         }
         console.log(_obj.count);
         let params;
         this.selectTrSingle(_idx,_obj);
         this.http.post('sub_cartcount',params = {indexid:indexid,qty:qty}).then((res) => { 
              // console.log(res)
              if(this.dataCountSetPrice>price*1 && this.currentTrIndexs.indexOf(_idx) > -1){
                  this.dataCountSetPrice = this.dataCountSetPrice+price*1
                  this.dataCountSetPrice -= price*1   
              }
          }).then(()=>{
              this.getCartItem();
         })
     }
     addOrder(){
         if(this.dataCountSet.length>0){
             this.router.navigate(['/order'])
         }else{
             this.info();
         }
         for(let i =0;i<this.dataCountSet.length;i++){
             let params ;
             let size = this.dataCountSet[i].size ? this.dataCountSet[i].size : '';
             let color = this.dataCountSet[i].color ? this.dataCountSet[i].color : '';
             this.http.post('add_order',params = {indexid:this.dataCountSet[i].indexid,count:this.dataCountSet[i].count,userid:this.dataCountSet[i].userid,username:this.dataCountSet[i].username,goodsid:this.dataCountSet[i].goodsid,proname:this.dataCountSet[i].proname,imgurl:this.dataCountSet[i].imgurl,size:size,color:color,price:this.dataCountSet[i].price}).then((res) => { 
                  // console.log(res)
              })
             // params.push(this.dataCountSet[i].indexid)
         }
         // let paramsorder;
         // console.log(params.join(','))
         // this.http.post('add_order',paramsorder = {indexid:params.join(',')}).then((res) => { 
         //          console.log(res)
         //   })
    }
    info() {
          this.confirmServ.info({
            title: '请勾选商品',
            content: '么么哒！！！'
          });
    }
    success() {
          this.confirmServ.success({
            title: '商品删除成功',
            content: '么么哒！！！'
          });
    }
}
