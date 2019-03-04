import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnailPipe',
  pure: false
})
export class ThumbnailPipe implements PipeTransform {
  thumbnail: string;
  cachedId: number;

  constructor(private mediaProvider: MediaProvider) {}

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args: string[]) {
    if (this.cachedId !== value) {
      this.cachedId = value;

      this.mediaProvider.getSingleMedia(value).subscribe(res => {
        if (!res.thumbnails) return res.screenshot;

        switch (args[0]) {
          case 'small':
          default:
            this.thumbnail = res.thumbnails.w160;
            break;
          case 'medium':
            this.thumbnail = res.thumbnails.w320;
            break;
          case 'large':
            this.thumbnail = res.thumbnails.w640;
            break;
          case 'screenshot':
            this.thumbnail = res.screenshot;
            break;
        }
      });
    }

    return this.thumbnail;
  }
}
