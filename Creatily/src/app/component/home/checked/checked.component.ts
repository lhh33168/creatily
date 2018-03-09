import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../../../utils/http.service'
import { Location } from '@angular/common';
@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss']
})
export class CheckedComponent implements OnInit {

    @Output() search_data = new EventEmitter<Array>();
  
    _search_data:string = null;

    constructor(private $:HttpService, private location: Location) { }

    ngOnInit() {
    }

    search(){
        this.$.get("go_search",{data:this._search_data}).then((res)=>{
            if(res['state']){
                this.search_data.emit(res['data']['results'] || []);
                console.log(this.search_data);
                console.log(res['data']['results']);
            }
        })
    }
    getback(){
      this.location.back();
  }
}
