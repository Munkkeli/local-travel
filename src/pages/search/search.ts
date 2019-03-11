import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { PipesModule } from '../../pipes/pipes.module';
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
  picArray: IPic[];

  searchChange = () => {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.getAllFiles();
    }, 500);
  };

  appMediaFilter = (pic: IPic) => {
    let description = { isLocalTravel: false };
    try {
      description = JSON.parse(pic.description);
    } catch (e) {
      return false;
    }

    return !!description.isLocalTravel;
  };

  getAllFiles = () => {
    this.mediaProvider.searchAllFiles(this.search).subscribe(res => {
      res.reverse();
      res = res.filter(this.appMediaFilter);
      this.picArray = res;
    });
  };

  showFullImage = (item: IPic) => {
    this.navCtrl
      .push(PlayerPage, {
        id: item.file_id
      })
      .catch(console.error);
  };
}
