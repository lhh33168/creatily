import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from '../../../utils/http.service'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
 
 carousel:Array<any> 
    constructor(private http:HttpService, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
     this.http.get('carousel').then((res) => { 
       this.carousel=res['data']['results']
     })
     var swiper = new Swiper('.carousel .swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      observer:true,
    observeParents:true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.carousel .swiper-pagination',
        clickable: true,
      }
    });
  }
  turn(idx){

    this.router.navigate(['detail',idx]  );
  }
  notification(){
    this.router.navigate(['/notification']);
  }
}
