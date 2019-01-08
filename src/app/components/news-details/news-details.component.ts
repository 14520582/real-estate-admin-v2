import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private afStorage: AngularFireStorage,
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
      } else {
        this.isEditing = false;
        this.news = new FormGroup({
          title: new FormControl('', [Validators.required]),
          headline: new FormControl('', [Validators.required]),
          thumbnail: new FormControl('', [Validators.required]),
          content: new FormControl('', [Validators.required]),
          category: new FormControl('', [Validators.required])
        })
        this.unites = [];
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
  upload(event, index) {
    const randomId = 'upload/realestate/' + Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    let task: any = ref.put(event.target.files[0]);
    task.snapshotChanges().pipe(
      // finalize((a) => {console.log(a)})
    )
    .subscribe( snapshot => {
      // get image upload progress
    },
    error => alert('Some error occured while uploading the picture'),
    () => ref.getDownloadURL().subscribe(downloadUrl => {
      // finally get download url from ref on completion of observable
      if(index === -1) {
        this.news.controls['thumbnail'].setValue(downloadUrl);
        this.onKeyDown('thumbnail');
      }else {
        this.unites[index].thumbnail = downloadUrl;
        this.saveUnit(index);
      }
    }))
  }
  saveUnit(i) {
    if (this.isEditing) {
      const ref = this.snackBar.open("Đang cập nhật tin tức...");
      if(this.unites[i].id) {
        this.newsService.updateUnit(this.unites[i]).pipe(
          catchError(err => {
            this.snackBar.open("Có lỗi xảy ra", '', {duration: 1000});
            ref.dismiss();
            return throwError(err);
          })
        )
        .subscribe( res => {
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
