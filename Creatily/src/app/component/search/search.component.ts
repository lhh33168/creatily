import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../../utils/http.service'


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    //@Input() table: string;
    @Output() search_data = new EventEmitter<Array>();
  
    _search_data:string = null;

    constructor(private $:HttpService) { }

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
}
