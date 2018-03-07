import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bootpage',
  templateUrl: './bootpage.component.html',
  styleUrls: ['./bootpage.component.scss']
})
export class BootpageComponent implements OnInit {
  count: Number = 10;
  constructor(private router: Router) { }

  ngOnInit() {
    const $self = this;
    const $timer = window.setInterval(() => {
      $self.count--;
      if ($self.count <= 0) {
        $self.count = 0;
        // console.log(66666666);
        window.clearInterval($timer);
        this.router.navigate(['home']);
      }
    }, 1000);
  }
}
