import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IPic } from '../../interfaces/media';
import { MediaProvider } from '../../providers/media/media';
import { PipesModule } from '../../pipes/pipes.module';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  media: IPic;
  username: string;
  filters: {
    brightness: 100;
    contrast: 100;
    saturation: 100;
    sepia: 0;
  };
  style = '';
  ownMedia = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public pipesModule: PipesModule
  ) {}

  ionViewDidLoad() {
    this.mediaProvider
      .getSingleMedia(this.navParams.get('id'))
      .subscribe(res => {
        this.media = res;

        const user = JSON.parse(localStorage.getItem('user'));

        this.ownMedia = user && user.user_id === res.user_id;

        try {
          this.filters = JSON.parse(res.description).style;
          if (this.filters) {
            this.style = `brightness(${this.filters.brightness}%) contrast(${
              this.filters.contrast
            }%) saturate(${this.filters.saturation}%) sepia(${
              this.filters.sepia
            }%)`;
          }
        } catch (e) {
          console.error(e);
        }

        if (user) {
          this.mediaProvider.getUser(res.user_id).subscribe(res2 => {
            this.username = res2.username;
          });
        } else {
          this.username = null;
        }
      });
  }

  deletePost = () => {
    this.mediaProvider.removePost(this.media.file_id).subscribe(res => {
      this.navCtrl.pop().catch(console.error);
    });
  };
}
