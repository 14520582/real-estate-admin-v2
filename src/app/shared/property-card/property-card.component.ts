import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() data: any;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  getImage() {
    return 'url(' + this.data.cover + ')';
  }
  deleteItem() {
    this.delete.emit();
  }
  editItem() {
    this.edit.emit();
  }
  goToDetails() {
    this.router.navigate(['property-details/', this.data.id])
  }
}
