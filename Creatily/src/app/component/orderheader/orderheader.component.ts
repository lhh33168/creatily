import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'orderheader',
  templateUrl: './orderheader.component.html',
  styleUrls: ['./orderheader.component.scss']
})
export class OrderheaderComponent {
  constructor(private router: Router){}
  back() {
    this.router.navigate(['user']);
  }

}
