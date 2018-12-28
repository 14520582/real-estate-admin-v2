import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CONSTANT } from '../../common/constant';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-news-manage',
  templateUrl: './news-manage.component.html',
  styleUrls: ['./news-manage.component.scss']
})
export class NewsManagerComponent implements OnInit {
  totalOfItems: number = 0;
  pageSize = CONSTANT.PAGE_SIZE;
  searchText= '';
  filter = '';
  newsData = [];

  newsTypes = [
    {value: 'market', label: 'Tin thị trường'},
    {value: 'analysis', label: 'Phân tích - nhận định'},
    {value: 'policy', label: 'Chính sách - Quản lý'},
    {value: 'plan', label: 'Thông tin quy hoạch'},
    {value: 'worldwide', label: 'Bất động sản thế giới'},
    {value: 'constant', label: 'Tư vất luật'},
    {value: 'advice', label: 'Lời khuyên'}
  ];
  type: FormControl;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { 
    this.type = new FormControl('market');
  }

  ngOnInit() {
    this.loadData(this.type.value, 0);
    this.type.valueChanges.subscribe( value => {
      this.newsService.getNewsByPageAndCategory(value,0).subscribe( data => {
        this.newsData = data.content;
        this.totalOfItems = data.totalElements;

      })
    })
  }
  onPaginateChange(event: PageEvent) {
    this.loadData(this.type.value, event.pageIndex);
  }
  loadData(category, pageIndex) {
    this.newsService.getNewsByPageAndCategory(category,pageIndex).subscribe( data => {
      this.newsData = data.content;
      this.totalOfItems = data.totalElements;

    })
  }
}
