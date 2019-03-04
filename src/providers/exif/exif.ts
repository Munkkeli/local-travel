import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXIF } from 'exif-js';

/*
  Generated class for the ExifProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExifProvider {

  fixOrientation(img) {
    try {
      console.log(img);
      try {
        EXIF.getData(img, function() {
          const orientation = EXIF.getTag(this, 'Orientation');
          console.log(orientation);
          switch (orientation) {
            case 6:
              this.style = 'transform: rotate(90deg)';
              break;
            case 8:
              this.style = 'transform: rotate(270deg)';
              break;
            case 3:
              this.style = 'transform: rotate(180deg)';
              break;
          }
        });
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }

  constructor(public http: HttpClient) {
    console.log('Hello ExifProvider Provider');
  }

}
