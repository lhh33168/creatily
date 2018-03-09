import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reglogin',
  templateUrl: './reglogin.component.html',
  styleUrls: ['./reglogin.component.scss']
})
export class RegloginComponent {
  constructor(private router: Router) { }

  getBackIndex() {
    this.router.navigate(['home']);
  }
}
