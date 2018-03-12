import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class HttpService{
    constructor(private http: Http){}

    private baseUrl: string = 'http://localhost:88/';
    private getUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    }

    get(api, params = {}){
        return new Promise((resolve, reject) => {
            params['_'] = Math.random();
            this.http.get(this.getUrl(api), new RequestOptions({
                method: RequestMethod.Get,
                search: params
            })).toPromise().then((res) => {
                resolve(res.json());
            }).catch((error) => {
                resolve(error);
            })
        })
    }
    post(api: string, params: Object = {}) {
        return new Promise((resolve, reject) => {
            function str(data: Object = {}) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret;
            }
            this.http.request(this.getUrl(api), new RequestOptions({
                method: RequestMethod.Post,
                body: str(params),
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            })).toPromise().then(res => {
                // console.log("post", res.json());
                resolve(res.json());
            }).catch((error)=>{
                resolve(error);
            })
        })
    }
}