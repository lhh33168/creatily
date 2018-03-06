import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

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

      constructor(private http: HttpService) { }

      ngOnInit() {
          this.http.get('get_hot').then((res) => { 
              this.carthot = res['data'].results;
              console.log(this.carthot)
          })
          this.getCartItem();
      }
      getCartItem(){
          let params = {}
          this.http.get('get_cart',params = {uid:1}).then((res) => { 
              this.cartItem = res['data'].results;
              this.dataset = res['data'].results;
          }).then(()=>{
              this.getPrice();
          })
      }
      getPrice(){
              this.dataCountSetPrice = 0;
              for(let i = 0;i<this.dataCountSet.length;i++){
                 this.dataCountSetPrice += this.dataCountSet[i].count*this.dataCountSet[i].price;
              }
              console.log(this.dataCountSetPrice)   
      }
      getKeys(item){
            return Object.keys(item);
      }
      selectTr(_idx,_obj){
            console.log(_obj,_idx)
            console.log(this.dataCountSet)

            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
                this.dataCountSet.splice(this.dataCountSet.indexOf(_idx), 1);
                this.getPrice();
            } else {
                this.currentTrIndexs.push(_idx);
                this.dataCountSet.push(_obj);
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
              console.log(res)
          }).then(()=>{
              this.getCartItem();
         })
     }
     stockCountAdd(indexid,qty){
         let params;
         this.http.post('add_cartcount',params = {indexid:indexid,qty:qty}).then((res) => { 
              console.log(res)
          }).then(()=>{
              this.getCartItem();
         })
     }
     stockCountSub(indexid,qty){
         let params;
         this.http.post('sub_cartcount',params = {indexid:indexid,qty:qty}).then((res) => { 
              console.log(res)
          }).then(()=>{
              this.getCartItem();
         })
     }
     addOrder(){
         for(let i =0;i<this.dataCountSet.length;i++){
             let params;
             this.http.post('add_order',params = {indexid:this.dataCountSet[i].indexid,count:this.dataCountSet[i].count,userid:this.dataCountSet[i].userid,username:this.dataCountSet[i].username,goodsid:this.dataCountSet[i].goodsid,proname:this.dataCountSet[i].proname,imgurl:this.dataCountSet[i].imgurl,size:this.dataCountSet[i].size,color:this.dataCountSet[i].color,price:this.dataCountSet[i].price}).then((res) => { 
                  console.log(res)
              })
         }
     }
}
