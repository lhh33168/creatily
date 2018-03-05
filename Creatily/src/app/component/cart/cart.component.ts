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

      constructor(private http: HttpService) { }

      ngOnInit() {
          this.http.get('get_hot').then((res) => { 
              this.carthot = res['data'].results;
              this.dataset = res['data'].results;;
              console.log(this.carthot)
          })
      }
      getKeys(item){
            return Object.keys(item);
      }
      selectTr(_idx){
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
            } else {
                this.currentTrIndexs.push(_idx);
            }
      }
      selectAll(){
        if(this.currentTrIndexs.length != this.dataset.length){
            this.currentTrIndexs = [];
            for(let i = 0; i < this.dataset.length; i++){
                this.currentTrIndexs.push(i);
            }
        } else {
            this.currentTrIndexs = [];
        }
     }
}
