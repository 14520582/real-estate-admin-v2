import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() news: any
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  deleteItem() {
    this.delete.emit();
  }
  editItem() {
    this.edit.emit();
  }
  goToDetails() {
    this.router.navigate(['news-details/', this.news.id])
  }
}
