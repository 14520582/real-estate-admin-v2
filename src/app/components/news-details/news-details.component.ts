import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news: FormGroup;
  unites: any[] = [{thumbnail: '', content: ''}];
  newsTypes = [
    {value: 1, label: 'Tin thị trường'},
    {value: 2, label: 'Phân tích - nhận định'},
    {value: 3, label: 'Chính sách - Quản lý'},
    {value: 4, label: 'Thông tin quy hoạch'},
    {value: 5, label: 'Bất động sản thế giới'},
    {value: 6, label: 'Tư vất luật'},
    {value: 7, label: 'Lời khuyên'}
  ];
  isEditing = false;
  newsData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private newsService: NewsService
  ) { 
    this.news = new FormGroup({
      title: new FormControl('', [Validators.required]),
      headline: new FormControl('', [Validators.required]),
      thumbnail: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if(params.id) {
        this.isEditing = true;
        this.newsService.getNewsById(params.id).subscribe(data => {
          this.newsData = data;
          this.news = new FormGroup({
            title: new FormControl(data.title, [Validators.required]),
            headline: new FormControl(data.headline, [Validators.required]),
            thumbnail: new FormControl(data.thumbnail, [Validators.required]),
            content: new FormControl(data.content, [Validators.required]),
            category: new FormControl(data.category.id, [Validators.required])
          })
          this.unites = data.unites
          this.news.controls['category'].valueChanges.subscribe( value => {
            const newItem = {
              ...this.newsData,
              category: {id: value}
            }
            this.submitChange(newItem);
          })
        })
      }
    });
  }
  onKeyDown(field) {
    if(this.news.valid && this.isEditing) {
      let newItem = {
        ...this.newsData,
      }
      newItem[field] = this.news.controls[field].value;
      this.submitChange(newItem);
    }
  }
  submitChange(body) {
    if (this.isEditing) {
      const ref = this.snackBar.open("Đang cập nhật tin tức...");
      this.newsService.updateNews(body).subscribe( res => {
        ref.dismiss()
      })
    }
  }
  saveUnit(i) {
    if (this.isEditing) {
      const ref = this.snackBar.open("Đang cập nhật tin tức...");
      if(this.unites[i].id) {
        this.newsService.updateUnit(this.unites[i]).subscribe( res => {
          this.newsData.unites[i] = res;
          ref.dismiss();
        })
      } else {
        this.newsService.saveUnit({news: {id: this.newsData.id}, ...this.unites[i]}).subscribe( res => {
          this.newsData.unites[i] = res;
          ref.dismiss();
        })
      }
    }
  }
  removeUnit(i) {
    if (this.isEditing) {
      const ref = this.snackBar.open("Đang cập nhật tin tức...");
      this.newsService.deleteUnit(this.unites[i].id).subscribe( res => {
        ref.dismiss();
      });
      this.newsData.unites.splice(i, 1);
    }
    this.unites.splice(i, 1);

  }
  addUnit() {
    this.unites.push({thumbnail: '', content: ''})
  }
  createNews() {
    const body = {
      title: this.news.controls['title'].value,
      headline: this.news.controls['headline'].value,
      thumbnail: this.news.controls['thumbnail'].value,
      content: this.news.controls['content'].value,
      category: {id: this.news.controls['category'].value},
      datecreated: Date.now(),
      unites: this.unites,
      views: 0
    }
    this.newsService.saveNews(body).subscribe( res => {
      this.router.navigate(["/news-manager"]);
    })
  }
}
