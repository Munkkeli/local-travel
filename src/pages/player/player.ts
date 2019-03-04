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

        const pattern = '\\[f\\](.*?)\\[\\/f\\]';
        const re = new RegExp(pattern);
        // console.log(re.exec(value));
        try {
          this.filters = JSON.parse(re.exec(res.description)[1]);
          this.style = `brightness(${this.filters.brightness}%) contrast(${
            this.filters.contrast
          }%) saturate(${this.filters.saturation}%) sepia(${
            this.filters.sepia
          }%)`;
        } catch (e) {
          console.error(e);
        }

        this.mediaProvider.getUser(res.user_id).subscribe(res2 => {
          console.log(res2);
          this.username = res2.username;
        });
      });
  }
}
