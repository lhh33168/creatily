import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
	
	 carthot1: Array<any> = [];
	 carthot2: Array<any> = [];
	 carthot3: Array<any> = [];
	 carthot4: Array<any> = [];
	 carthot5: Array<any> = [];
	 carthot6: Array<any> = [];
	 carthot7: Array<any> = [];
	 dataCommunity: number = 0;
	 a:Object<any> ={};

  constructor(private http: HttpService) { }

  ngOnInit():void {
  	  var galleryTop = new Swiper('.gallery-top', {
  	  	loopedSlides: 5,
      	spaceBetween: 0,
	      initialSlide: 0,
	      centeredSlides: true,
	      slidesPerView: 'auto',
	      allowSwipeToPrev : false,
	      touchRatio: 0.2,
	      slideToClickedSlide: true
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
     spaceBetween: 1
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
    
    this.http.get('space').then((res) => {
    				 this.carthot1 = res['data'].results;
             console.log(this.carthot1)
          });
    this.http.get('unboxing').then((res) => {
    				 this.carthot2 = res['data'].results;
             console.log(this.carthot2)
          });
    this.http.get('shop').then((res) => {
    				 this.carthot3 = res['data'].results;
             console.log(this.carthot3)
          });
	 	this.http.get('specia').then((res) => {
				 this.carthot4 = res['data'].results;
	     console.log(this.carthot4)
	  });
	  this.http.get('brand').then((res) => {
				 this.carthot5 = res['data'].results;
	     console.log(this.carthot5)
	  });
	  this.http.get('media').then((res) => {
				 this.carthot6 = res['data'].results;
	     console.log(this.carthot6)
	  });
	  this.http.get('jianfan').then((res) => {
				 this.carthot7 = res['data'].results;
	     console.log(this.carthot7)
	  })
	  
    
  }
  
  getKeys(item){
            return Object.keys(item);
      }
  
  stockCountAdd_1(id,dianzan,status,event){
  	let params;
         this.http.post('add_cartcount_1',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot1 =res['data'].results;
               event.target['style'].color='yellow';
         })
	
  }
  
  stockCountAdd_2(id,shoucang,status1){
  	let params;
         this.http.post('add_cartcount_2',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot1 =res['data'].results;
                
          })
  }
  
  stockCountAdd_3(id,pinglun){
  	let params;
         this.http.post('add_cartcount_3',params = {id:id,pinglun:pinglun}).then((res) => { 
              console.log(res)
               this.carthot1 =res['data'].results;
          })
  }

}
