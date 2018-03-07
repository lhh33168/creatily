import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
      selector: 'app-new-address',
      templateUrl: './new-address.component.html',
      styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

      phone:number = 0;

      constructor(private http: HttpService) { }

      ngOnInit() {

      }

      addAddress(phone){
          
          console.log(phone)
      }
}
