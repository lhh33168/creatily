import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from '../../utils/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
      constructor(private http:HttpService,private route: ActivatedRoute, private router: Router) { };
      selectHome:Array<any>=[];
    selectshow:Array<any>=[];
    homeShow:Array<any>=[];
    selectId:string;
    Imgs:string
  ngOnInit(): void{
      this.http.get('listSelect').then((res)=>{
        this.selectHome=res['data']['results']
     })
     this.http.get('homeShow').then((res)=>{
        this.homeShow=res['data']['results']
        console.log(this.homeShow)
     })
      var swiper = new Swiper('.showsImg .swiper-container', {
        observer:true,
        observeParents:true,
        pagination: {
          el:'.showsImg .swiper-pagination'
        },
      });
    }
    getKeys(item){

        return Object.keys(item);
    }
    selectList(categoryId,event){
        var s = document.querySelector('.show');
        s['style'].display='none';
        var ss =document.querySelector('.selecttype');
        ss['style'].display='block';
        var sss = document.querySelector('.Imgs')
        sss['style'].width="100%";
       this.selectId=categoryId;
        this.http.get(`listPass?selectId=`+this.selectId).then((res)=>{
        this.selectshow=res['data']['results'];
          // console.log(this.selectshow)
        
        this.Imgs=this.selectshow[0]['img']
        // console.log(this.selectshow[0]['img'])
     })
    }
    selector(event){
        var ss = document.querySelector('.selecttype');
        var s = document.querySelector('.show');
        ss['style'].display='none';
        s['style'].display='block';
        this.http.get('listSelect').then((res)=>{
        this.selectHome=res['data']['results']
         })
    }
    turn(idx){

    this.router.navigate(['detail',idx],{queryParams:{id:idx}  } );
  }
  turns(idx){

    this.router.navigate(['detail',idx],{queryParams:{id:idx}  } );
  }
}
 


