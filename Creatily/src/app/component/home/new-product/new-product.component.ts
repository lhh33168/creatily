import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../utils/http.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(private http:HttpService, private route: ActivatedRoute, private router: Router ) {}
  newproduct:Array<any>; 
  newprice:Array<string>;
  ngOnInit(): void {
   this.http.get('newProduct').then((res) => { 
       this.newproduct=res['data']['results'];
       var fad = this.newproduct;
       var fadd =this.newprice=[];
       for(var i=0;i<fad.length;i++){
          fadd.push(fad[i].price.split(',')[0])
       }
  
     })
    var swiper = new Swiper('.newProduct .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 40,
      observer:true,
      observeParents:true,
      // init: false,
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      }
    });
  }
  turn(idx){

    this.router.navigate(['detail',idx],{queryParams:{id:idx}  } );
  }

}
