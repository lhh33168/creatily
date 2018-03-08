import {Http} from '@angular/http';
import {Injectable} from '@angular/core'

@Injectable()
export class CommonService{
    lanType: string = 'cn';
    publicDic: Object = {};
    opacity = 1;

    constructor(private http: Http){
        http.get('http://localhost:88/utils/dictionary.txt').subscribe((dicRes) => {
            this.publicDic = dicRes.json();
        })
    }
}