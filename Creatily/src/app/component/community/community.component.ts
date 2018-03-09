import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router ) { }

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
          });
    this.http.get('unboxing').then((res) => {
    				 this.carthot2 = res['data'].results;
          });
    this.http.get('shop').then((res) => {
    				 this.carthot3 = res['data'].results;
          });
	 	this.http.get('specia').then((res) => {
				 this.carthot4 = res['data'].results;
	  });
	  this.http.get('brand').then((res) => {
				 this.carthot5 = res['data'].results;
	  });
	  this.http.get('media').then((res) => {
				 this.carthot6 = res['data'].results;
	  });
	  this.http.get('jianfan').then((res) => {
				 this.carthot7 = res['data'].results;
	  })
  }
  
  getdata(xm){
  	if(xm.length>0){
  		this.carthot1=xm[0];
  	}
  }
  
  getKeys(item){
            return Object.keys(item);
      }
  
  stockCountAdd_1_1(id,dianzan,status,event){
  			let params;
         this.http.post('add_cartcount_a1',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot1 =res['data'].results;
              
         });
         
         this.http.post('add_cartcount_a2',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot2 =res['data'].results;
              
         });
         
         this.http.post('add_cartcount_a3',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot3 =res['data'].results;
               
              
         });
         
         this.http.post('add_cartcount_a4',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot4 =res['data'].results;
               
              
         });
         
         this.http.post('add_cartcount_a5',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot5 =res['data'].results;
               
              
         });
         
         this.http.post('add_cartcount_a6',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot6 =res['data'].results;
               
              
         });
         
          this.http.post('add_cartcount_a7',params = {id:id,dianzan:dianzan,status:status}).then((res) => { 
              
               this.carthot7 =res['data'].results;
              
         });
         
  }
  
  stockCountAdd_2_1(id,shoucang,status1){
  	let params;
         this.http.post('add_cartcount_2_1',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot1 =res['data'].results;
                
         });
         
        this.http.post('add_cartcount_2_2',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot2 =res['data'].results;
                
         });
         
          this.http.post('add_cartcount_2_3',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot3 =res['data'].results;
                
          })
           this.http.post('add_cartcount_2_4',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot4 =res['data'].results;
                
          })
            this.http.post('add_cartcount_2_5',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot5 =res['data'].results;
                
          })
             this.http.post('add_cartcount_2_6',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot6 =res['data'].results;
                
          })
              this.http.post('add_cartcount_2_7',params = {id:id,shoucang:shoucang,status1:status1}).then((res) => { 
             
               this.carthot7 =res['data'].results;
                
          })
  }
  
  stockCountAdd_tp(id){
    this.router.navigate(['comment',id]);
  }
  
  stockCountAdd_3(id){
    this.router.navigate(['comment',id]);
  }
}
