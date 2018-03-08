import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from '../../../utils/http.service'
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  constructor(private http:HttpService, private route: ActivatedRoute, private router: Router) { }
    showproduct:Array<any>;
  ngOnInit(): void {
   this.http.get('showProduct').then((res) => { 
       this.showproduct=res['data']['results']
     })
    var swiper = new Swiper('.showProduct .swiper-container', {
     observer:true,
        observeParents:true,
      pagination: {
        el: '.showProduct .swiper-pagination'
      },
    });
  }
  turn(idx){

    this.router.navigate(['comment',idx],{queryParams:{id:idx}  } );
  }
  stockCountAdd_1(id,dianzan,status,event){
  console.log(id)
      let params;
         this.http.post('add_zan',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.showproduct=res['data']['results']    
         });
    }
    stockCountAdd_2(id,shoucang,status1){
      console.log(id)
       let params;
         this.http.post('add_cang',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
               this.showproduct=res['data']['results']    
         });
    }
     stockCountAdd_3(idx){
        this.router.navigate(['comment',idx],{queryParams:{id:idx}})
     }
}
