import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() news: any
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToDetails() {
    this.router.navigate(['news-details/', this.news.id])
  }
}
