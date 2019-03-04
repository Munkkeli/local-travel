import { Pipe, PipeTransform } from '@angular/core';
import { Pic } from '../../interfaces/mediaInterfaces';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider) {

  }

  async transform(id: number, size = 'small') {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFile(id).subscribe((file: Pic) => {
        if (file.thumbnails) {
          switch (size) {
            case 'small':
              resolve(this.mediaProvider.imageUrl + file.thumbnails.w160);
              break;
            case 'medium':
              resolve(this.mediaProvider.imageUrl + file.thumbnails.w320);
              break;
            case 'large':
              resolve(this.mediaProvider.imageUrl + file.thumbnails.w640);
              break;
          }
        } else {
          resolve('http://via.placeholder.com/640x320/000?text=Audio / Video');
        }
      });
    });
  }

}
