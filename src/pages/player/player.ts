import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic, User } from '../../interfaces/mediaInterfaces';
import { ExifProvider } from '../../providers/exif/exif';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  file: Pic;
  type = '';
  user: User;
  likes = 0;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public exif: ExifProvider) {
  }

  ionViewDidLoad() {
    this.mediaProvider.getFile(this.navParams.get('fileId')).subscribe(
      (file: Pic) => {
        console.log(file);
        this.file = file;
        this.type = file.media_type;
        this.mediaProvider.getUser(file.user_id, localStorage.getItem('token')).
          subscribe((user: User) => {
            this.user = user;
          });
      });
  }

}
