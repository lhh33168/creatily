import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    proId: string;
    dataset: Array<any> = [];
    groundImg: Array<string> = null;
    price: Array<string>;
    graphics: Array<string> = null;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpService) { }

    ngOnInit(): void{
        this.route.params.subscribe((params) => {
            // console.log(params);
            this.proId = params['id'];
            // console.log(this.proId)
        });

        this.http.get(`get_details?id=` + this.proId).then((res) => {
            // console.log(res.json());
            this.dataset = res['data']['results'][0];
            // console.log(this.dataset)
            this.groundImg = this.dataset['groundImg'].split(',');
            // console.log(this.groundImg)
            this.price = this.dataset['price'].split(',')[0];
            // console.log(this.price)
            this.graphics = this.dataset['graphics'].split(',');
            console.log(this.graphics)

		    var swiper = new Swiper('.swiper-container',{  
				pagination: {
					el: '.swiper-pagination',
					Clickable: true,
				},  
				direction : 'horizontal',  
			    longSwipesRatio: 0.3,  
			    touchRatio:1,  
			    observer:true,//修改swiper自己或子元素时，自动初始化swiper  
			    observeParents:true,//修改swiper的父元素时，自动初始化swiper  
			});  
        });
    }

}
