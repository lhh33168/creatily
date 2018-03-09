import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-seek',
  templateUrl: './seek.component.html',
  styleUrls: ['./seek.component.scss']
})
export class SeekComponent implements OnInit {

  constructor( private location: Location,private route: ActivatedRoute, private router: Router) { }
    seeking:Array<any>=[];
  ngOnInit() {
    
  }
  getdata(seek){
       this.seeking=seek[1]
        console.log(seek)
    }
    getback(){
      this.location.back();
  }

}
