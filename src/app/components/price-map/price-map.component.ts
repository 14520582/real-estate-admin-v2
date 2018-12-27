import {Component, OnInit} from '@angular/core';
import { FeatureCollection, PriceService } from './price-map.service';
import { projection } from 'devextreme/viz/vector_map/projection';

@Component({
  selector: 'app-price-map',
  providers: [ PriceService ],
  templateUrl: './price-map.component.html',
  styleUrls: ['./price-map.component.scss']
})
export class PriceMapComponent implements OnInit {
    pangaeaBorders: FeatureCollection;
    pangaeaContinents: FeatureCollection;
    projection: any;
    prices: any;
    pricesData = {};
    constructor(
        private service: PriceService
    ) {
        this.pangaeaContinents = service.getPangaeaContinents();
        this.customizeTooltip = this.customizeTooltip.bind(this);
        // this.prices = service.getPrices();
        // this.prices.features.forEach(ele => {
        //     ele.properties.url = "../../../assets/img/arrow-up.png"
        //     ele.geometry.coordinates
        //     let x = ele.geometry.coordinates[0];
        //     let y = ele.geometry.coordinates[1];
        //     if (x < 840) {
        //         x = (840 - x)/(-10)
        //     } else {
        //         x = (x - 840)/10
        //     }
        //     ele.geometry.coordinates[0] = x;
        //     if (y < 1000) {
        //         y = (1000 - y)/10
        //     } else {
        //         y = (y - 1000)/(-10)
        //     }
        //     ele.geometry.coordinates[1] = y;
        //     console.log(ele.geometry.coordinates);
        // });
        this.pangaeaContinents.features.forEach(element => {
            element.geometry.coordinates[0].forEach(item => {
                let x = item[0];
                let y = item[1];
                if (x < 840) {
                    x = (840 - x)/(-10)
                } else {
                    x = (x - 840)/10
                }
                item[0] = x;
                if (y < 1000) {
                    y = (1000 - y)/10
                } else {
                    y = (y - 1000)/(-10)
                }
                item[1] = y;
            })
        });
        this.projection = projection({
            to: function (coordinates) {
                return [coordinates[0] / 100, coordinates[1] / 100];
            },
        
            from: function (coordinates) {
                return [coordinates[0] * 100, coordinates[1] * 100];
            }
        });
    }
    ngOnInit() {
        this.service.getMarketPrice().subscribe( data => {
            data.forEach( item => {
                this.pricesData[item.district.id] = item;
            })
            // console.log(this.pricesData)
        });
    }
    customizeTooltip(arg) {
        console.log(arg.attribute("id"))
        const info = this.pricesData[arg.attribute("id")];
        if (!info) {
            return { text : 'Không có dữ liệu'};
        }
        const labelPer = info.percentage > 0 ? 'Tăng: ' + info.percentage : 'Giảm: ' + Math.abs(info.percentage);
        const rate = info.rate > 1000 ? info.rate/1000 + ' tỷ/m2' : info.rate + ' triệu/m2';
            return {
                html: "<div><h3>" + info.district.name + "</h3><div>Giá: " + rate 
                + "</div><div>" + labelPer + "%</div></div>"
            };
    }
    customizeText(arg) {
        return 'sfdsfsdf';
    }
    customizeLayer(elements) {
        elements.forEach(function (element) {
            element.applySettings({
                color: element.attribute("color")
            });
        });
    };

}
