import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
      selector: 'app-address',
      templateUrl: './address.component.html',
      styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

      getaddress: Array<any> = [];

      constructor(private http: HttpService) { }

      ngOnInit() {
          let params;
          this.http.get('get_address',params = {userid:123}).then((res) => { 
              this.getaddress = res['data'].results;
              console.log(this.getaddress)
          })
      }

}
