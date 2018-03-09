import { Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {HttpService} from '../../utils/http.service'
import {CommonService} from '../../utils/common.service'
import {Utils} from '../../utils/utils'

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {
    apiconfig:string;
    dataset:Array<any> = null;
    key:string = null;
    columns:Array<string> = null;
    filterColumns:Array<string> = null;
    privateDic:Object;
    filterDataConfig:Object = {};
    currentTrIndexs: Array<number> = [];
    currentObj: Object = {};
    remove:Array<number> = [];
    multiple = true;
    opt:Object = {}; 
    delete_arr:string='';
    show = false;
    show2 = false;
    add_data:Object = {};
    search_data:string = '';
    qty = null;
    page:number = 1;
    rows = 0;
    page_count=0;
    user_id;
    management = null;
    big = false;


    @Input() config:string;

    constructor(private http: Http,private $:HttpService,private common:CommonService) { }

    ngOnInit() {
        this.init(this.page);
    }

    init(_page){
        this.$.get(this.config).then((configRes)=>{
            if(configRes['page_api']){
                this.apiconfig = configRes['page_api']["api"];
                this.qty = configRes['page_api']["qty"];
            }else{
                this.apiconfig = configRes['api'];
            }

            this.key = configRes['key'];

            let cols = configRes['cols'];
            this.columns = !cols || cols =='*' ? [] : cols.split(',');

            let filterCols = configRes['filterCols'];
            this.filterColumns = !filterCols ? [] : filterCols.split(',');

            let dic = configRes['dictionary'];
            this.privateDic = dic || {};

            this.filterDataConfig = configRes['filterData'] || {};

            this.multiple = configRes['multiple'];

            this.opt = configRes['opt'];

            this.management = configRes['management'] || null;
            this.user_id = JSON.parse(sessionStorage.getItem('user_id'));

            this.apiRequest(_page);
        })
    }

    apiRequest(_page_){
        if(this.qty != null){
            this.$.get(this.apiconfig,{_qty:this.qty,_page:_page_ || this.page}).then((apiRes)=>{
                this.dataset = apiRes['data']["results"][0] || [];
                this.rows = apiRes['data']["results"][1][0]["rowsCount"];
                this.page_count = Math.ceil(this.rows/this.qty);
            })
        }else{
            this.$.get(this.apiconfig).then((apiRes)=>{
                this.dataset = apiRes['data']["results"] || [];
            })
        }
    }

    getKeys(obj,a){
        return Object.keys(obj) || [];
    }

    size(){
        this.big = !this.big;
    }

    add(){
        if(this.management && this.management.indexOf(this.user_id) < 0){
            alert("没有权限，请联系管理员！");
            return;
        }
        this.show = !this.show;
    }

    cancel(){
        this.add_data = {};
        this.show = !this.show;
    }

    enter(){
        this.$.post(this.opt['add_all'],this.add_data).then((add_res)=>{
            if(add_res['state']){
                alert('操作成功');
            }else{
                alert(add_res['error']['code']);
            }
            this.add_data = {};
            this.show = !this.show;
        })
    }

    delete(_idx,_primary_key,event){
        event.stopPropagation();
        if(this.currentTrIndexs.indexOf(_idx) == -1){
            return ;
        }else if(this.management && this.management.indexOf(this.user_id) < 0){
            alert("没有权限，请联系管理员！");
            return;
        }else{
            this.$.post(this.opt['delete'],{key:_primary_key}).then((delete_res)=>{
                if(delete_res['state']){
                    this.remove.push(_idx);
                    this.currentTrIndexs = [];
                    alert('操作成功！')
                }
            })
        }
    }

    delete_all(){
        if(this.management && this.management.indexOf(this.user_id) < 0){
            alert("没有权限，请联系管理员！");
            return;
        }
        for(let i=0;i<this.currentTrIndexs.length;i++){
            this.delete_arr += ",'"+this.dataset[this.currentTrIndexs[i]][this.opt["primary_key"]]+"'";
        }
        this.$.post(this.opt['delete_all'],{key_str:this.delete_arr}).then((deleteAll_res)=>{
            if(deleteAll_res['state']){
                this.remove = this.currentTrIndexs;
                this.currentTrIndexs = [];
                alert('操作成功！');
            }
        })
    }

    update(_obj,_idx){
        event.stopPropagation();

        if(this.currentTrIndexs.indexOf(_idx) == -1) {
            return;
        }else if(this.management && this.management.indexOf(this.user_id) < 0){
            alert("没有权限，请联系管理员！");
            console.log("没有权限，请联系管理员！");
            return;
        }
         console.log("update");
            this.show2 = !this.show2;
            this.currentObj = _obj || {};
            console.log(this.currentObj);
        
    }

    cancel2(){
        this.currentObj = {};
        this.show2 = !this.show2;
    }

    enter2(){
        console.log(this.currentObj);
        let arr = this.opt['show_key'];
        for(var key in this.currentObj){
            if(arr.indexOf(key) == -1){
                delete this.currentObj[key];
            }
        }
        this.currentObj
        this.$.post(this.opt['update_all'],this.currentObj).then((add_res)=>{
            if(add_res['state']){
                alert('操作成功');
            }else{
                alert(add_res['error']['code']);
            }
            this.currentObj = {};
            this.show2 = !this.show2;
        })
    }

    btn_search(){
        this.$.get(this.opt['selete_all']['api'],{key:this.opt['selete_all']['cols_str'],data:this.search_data}).then((seleteAll_res)=>{
            if(seleteAll_res["data"] && seleteAll_res["data"]["results"].length>0){
                this.dataset = seleteAll_res["data"]["results"];
            }else{
                alert("未查询到数据！")
            }
            
        })
    }

    change(){
        if(this.search_data == ''){
            this.init(this.page);
        }
    }

    page_change(page){
        this.init(page);
        this.currentTrIndexs = [];
    }

    selectTr(_idx){
        if(this.multiple){
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
            } else {
                this.currentTrIndexs.push(_idx);
            }
        } else {
            this.currentTrIndexs = [_idx];
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

    filterData(_key,_val){
        let _config = this.filterDataConfig[_key];
        if(!_config){
            return _val;
        }else if(_config.type == "DateFormat"){
            return Utils.dateFormat(new Date(_val), _config.format);
        }else if(_config.type=="phone"){
            let reg = new RegExp(_config.reg);
            return _val.replace(reg, _config.replaceVal);
        }
    }

}
