import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() title: string;
  @Input() dataSource: any[];
  constructor() {
  }

  ngOnInit() {
  }

}
