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
  
     })
    var swiper = new Swiper('.newProduct .swiper-container', {
      slidesPerView: 1,
      spaceBetween: 40,
      observer:true,
      observeParents:true,
      // init: false,
      breakpoints: {
        1024: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 2.5,
          spaceBetween: 5,
        }
      }
    });
  }
  turn(idx){

    this.router.navigate(['detail',idx]   );
  }

}
