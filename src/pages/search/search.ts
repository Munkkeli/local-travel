import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { PipesModule } from '../../pipes/pipes.module';
import { Observable } from 'rxjs/Observable';
import { IPic } from '../../interfaces/media';
import { PlayerPage } from '../player/player';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  constructor(
    public navCtrl: NavController,
    public mediaProvider: MediaProvider,
    public pipesModule: PipesModule
  ) {}

  search = '';
  timeout = null;

  ionViewDidEnter() {
    this.showUploadButton = this.mediaProvider.loggedIn;
  }

  showUploadButton = false;
  picArray: Observable<IPic[]>;

  searchChange = () => {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.getAllFiles();
    }, 500);
  };

  getAllFiles = () => {
    this.picArray = this.mediaProvider.searchAllFiles(this.search);
  };

  showFullImage = (item: IPic) => {
    this.navCtrl
      .push(PlayerPage, {
        id: item.file_id
      })
      .catch(console.error);
  };
}
