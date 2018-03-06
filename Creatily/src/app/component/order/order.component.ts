import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

      order: Array<any> = [];
      address: Array<any> = [];

      constructor(private http: HttpService) { }

      ngOnInit() {
          this.http.get('get_hot').then((res) => { 
              this.order = res['data'].results;
              console.log(this.order)
          })
          let params;
          this.http.get('get_address',params = {userid:123}).then((res) => { 
              this.address = res['data'].results;
              console.log(this.address)
          })
      }

}
