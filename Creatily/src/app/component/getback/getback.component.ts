import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'getback',
  templateUrl: './getback.component.html',
  styleUrls: ['./getback.component.scss']
})
export class GetbackComponent{

  constructor( private location: Location) {  }

  getback(){
      this.location.back();
  }
}
