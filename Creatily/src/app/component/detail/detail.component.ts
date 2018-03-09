import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../utils/http.service';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    userid: number = 123;
    username: string = 'ljt';
    proId: number;
    dataset: Array<any> = [];
    groundImg: Array<string> = [];
    price: number;
    graphics: Array<string> = [];
    size: Array<string> = [];
    color: Array<string>= [];
    headShow: boolean = true;
    headShow2: boolean = false;
    categroyShow: boolean = false;
    currentImgIdx: number = 0;
    count: number = 1;
    currentSizeIdx: number;
    currentSizePrice: number;
    currentColorIdx: number;
    classlist:object = {};
    tip:Array<string> = [];
    tipCount: number = 0;


    constructor(private route: ActivatedRoute, private router: Router, private http: HttpService, private location: Location, private _message: NzMessageService) { }

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
             //console.log(this.groundImg)
            this.price = this.dataset['price'].split(',')[0];
            // console.log(this.price)
            this.graphics = this.dataset['graphics'].split(',');
            // console.log(this.graphics)
            this.size = this.dataset['size'] ? this.dataset['size'].split(',') : [];
            // console.log(this.size)
            this.color = this.dataset['color'] ? this.dataset['color'].split(',') : [];
            // console.log(this.color)
            this.currentSizePrice = this.dataset['price'].split(',')[0];
            // console.log(this.currentSizePrice)

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
        
        this.getTipCount();
        
    };

    getTipCount(){
        this.http.get('getcartslist',{userid:this.userid}).then((res) => {
            // console.log(res['data']['results'][0]['count(*)'])
            this.tipCount = res['data']['results'][0]['count(*)'];
        })
    };

    goBack(){
        this.location.back();
    };

    test(event){
        // console.log(event.target.scrollTop)
        if(event.target.scrollTop>=400){
            this.headShow = false;
            this.headShow2 = true;
        }else{
            this.headShow = true;
            this.headShow2 = false;
        }
    };

    selecterCategroy(){
        this.headShow = false;
    	this.categroyShow = true;
        this.classlist['count'] = this.count;
    };

    close(){
        this.headShow = true;
    	this.categroyShow = false;
        this.count = 1;
        this.currentSizeIdx = null;
        this.currentColorIdx = null;
        this.currentImgIdx = 0;
        this.currentSizePrice = this.dataset['price'].split(',')[0];
        this.tip = [];
        this.classlist = {};
    };

    stockCountAdd(){
        if(this.count < 10){
            this.count++;
            this.classlist['count'] = this.count;
        }
    };

    stockCountSub(){
        if(this.count > 1){
            this.count--;
            this.classlist['count'] = this.count;
        }
    };

    addSize(_idx, event){
        // console.log(_idx, event.target.innerText)
        if(this.currentSizeIdx != _idx){
            this.currentImgIdx = _idx;
            this.currentSizeIdx =_idx;
            this.currentSizePrice = this.dataset['price'].split(',')[_idx];
            this.classlist['size'] = event.target.innerText;
            this.tip[0] = event.target.innerText;
        }else{
            this.currentSizeIdx = null;
            this.currentImgIdx = 0;
            this.currentSizePrice = this.dataset['price'].split(',')[0];
            this.classlist['size'] = null;
            this.tip.splice(0,1);
        }
    };

    addColor(_idx, event){
        // console.log(_idx, event.target.innerText)
        if(this.currentColorIdx != _idx){
            this.currentColorIdx =_idx;
            this.classlist['color'] = event.target.innerText;
            this.tip[1] = event.target.innerText;
        }else{
            this.currentColorIdx = null;
            this.classlist['color'] = null;
            this.tip.splice(1,1);
        }
    };

    addtoCart(){
        if(this.userid && this.username){
            this.headShow = false;
            this.categroyShow = true;
            if((this.size.length>0) && this.classlist && (!this.classlist['size'] || this.classlist['size'] == null)){
                // console.log('请选择类型')
                this._message.info('请选择类型');
            }else if ((this.color.length>0) && this.classlist && (!this.classlist['color'] || this.classlist['color'] == null)){
                // console.log('请选择颜色')
                this._message.info('请选择颜色');
            }else{
                this.classlist['count'] = this.count;
                this.classlist['userid'] = this.userid;
                this.classlist['username'] = this.username;
                this.classlist['goodsid'] = this.proId;
                this.classlist['proname'] = this.dataset['proName'];
                this.classlist['imgurl'] = this.groundImg[this.currentImgIdx];
                this.classlist['price'] = this.currentSizePrice;
                // console.log(this.classlist)
                this.http.post('add_cart',this.classlist).then((res)=>{
                    // console.log('已加入购物车')
                    this._message.info('已加入购物车');
                }).then(() => {
                    this.getTipCount();
                })
                this.count = 1;
                this.currentSizeIdx = null;
                this.currentColorIdx = null;
                this.currentImgIdx = 0;
                this.currentSizePrice = this.dataset['price'].split(',')[0];
                this.tip = [];
                this.classlist = {};
            }
            // console.log(this.classlist)
        }else{
            this.router.navigate(['/login']);
        }
    };

    gotoOrder(){
        this.headShow = false;
        this.categroyShow = true;
        if((this.size.length>0) && this.classlist && (!this.classlist['size'] || this.classlist['size'] == null)){
            // console.log('请选择类型')
            this._message.info('请选择类型');
        }else if ((this.color.length>0) && this.classlist && (!this.classlist['color'] || this.classlist['color'] == null)){
            // console.log('请选择颜色')
            this._message.info('请选择颜色');
        }else{
            this.classlist['count'] = this.count;
            this.classlist['userid'] = this.userid;
            this.classlist['username'] = this.username;
            this.classlist['goodsid'] = this.proId;
            this.classlist['proname'] = this.dataset['proName'];
            this.classlist['imgurl'] = this.groundImg[this.currentImgIdx];
            this.classlist['price'] = this.currentSizePrice;
            this.http.post('add_order',this.classlist).then((res)=>{
                this.router.navigate(['/order',{status:1}]);
            });
        }
    };

    

}
