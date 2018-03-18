import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bootpage',
  templateUrl: './bootpage.component.html',
  styleUrls: ['./bootpage.component.scss']
})

export class BootpageComponent implements OnInit {
  bootImg: Array<any> = [];
  endLen: Number;
  constructor(private router: Router, private $http: HttpService) { }
  ngOnInit() {
    const bootBootlean = window.localStorage.getItem('bootIndex');
    if (bootBootlean == null || !bootBootlean) {
      window.localStorage.setItem('bootIndex', 'true');
      this.router.navigate(['/bootpage']);
    } else if (bootBootlean) {
      this.router.navigate(['/home']);
    }

    this.$http.get('bootImg').then((res) => {
      if (res['results'].length > 0) {
        this.bootImg = res['results'];
        this.endLen = this.bootImg.length;
        this.loopIndex(this.bootImg.length - 1);
      }
    });
  }
  loopIndex(idxLen) {
    const $self = this;
    const swiper = new Swiper('.bootpage .swiper-container', {
      on: {
        touchEnd: function(event) {
          event.stopPropagation();
          if ( this.activeIndex === idxLen) {
            $self.router.navigate(['home']);
            // console.log('end');
          }
        }
      },
      pagination: {
        el: '.swiper-pagination'
      },
      observer: true,
      observeParents: true,
    });
  }
  skipBtn() {
    // console.log(666);
    this.router.navigate(['home']);
  }
}
