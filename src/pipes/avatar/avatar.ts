import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/mediaInterfaces';

/**
 * Generated class for the AvatarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider) {

  }

  async transform(tag: string) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByTag(tag).subscribe((files: Pic[]) => {
        files.forEach((file: Pic) => {
          if (file.user_id === this.mediaProvider.user.user_id) {
            console.log(file);
            resolve(file.file_id);
          }
        });
      });
    });
  }
}
