import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  realEstateData=[];
  category: string;
  newsData=[];
  mostViewsData=[];
  topics: any[]
  indexOfPage: number = 0;
  numOfPage: number = 0;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { 
      
      this.route.params.subscribe( params => {
        this.category = params.category
        this.indexOfPage = 0;
        this.newsService.getNewsMostView().subscribe( data => {
          this.mostViewsData = data;
        })
        this.newsService.getNewsByPageAndCategory(this.category,0).subscribe( data => {
          this.newsData = data.content;
          this.numOfPage = data.totalPages;
        })
        this.topics = this.newsService.getTopics()
      });

  }

  ngOnInit() {
  }

  changePage(isNext: boolean) {
    if(isNext && this.indexOfPage < this.numOfPage){
      this.indexOfPage += 1;
    }
    if(!isNext && this.indexOfPage > 0) {
      this.indexOfPage -= 1;
    }
    this.newsService.getNewsByPageAndCategory(this.category,this.indexOfPage).subscribe( data => {
      this.newsData = data.content;
	  window.scroll(0,0);
    })
    console.log(this.indexOfPage)
  }
}
