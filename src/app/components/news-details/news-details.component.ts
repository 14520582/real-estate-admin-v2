import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news = null;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { 
    this.route.params.subscribe( params => {
      this.newsService.getNewsById(params.id).subscribe(data => {
        this.news = data;
      })
    });
  }

  ngOnInit() {
  }

}
