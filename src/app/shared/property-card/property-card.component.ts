import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() data: any;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  getImage() {
    return 'url(' + this.data.cover + ')';
  }
  goToDetails() {
    this.router.navigate(['property-details/', this.data.id])
  }
}
