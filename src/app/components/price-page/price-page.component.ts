import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PriceService } from '../../services/price-map.service';

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.scss']
})
export class PricePageComponent implements OnInit {
  data = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private priceService: PriceService
  ) { 
  
  }
  onEnter(item) {
    const ref = this.snackBar.open("Đang cập nhật dữ liệu");
    this.priceService.update(item).subscribe( res => {
      ref.dismiss();
    });
  }
  ngOnInit() {
   this.priceService.getMarketPrice().subscribe( res => {
     this.data = res;
     console.log(res);
   });
  }
  
}
