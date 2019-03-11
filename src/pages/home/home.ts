import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MediaProvider } from '../../providers/media/media';
import { IPic } from '../../interfaces/media';
import { PipesModule } from '../../pipes/pipes.module';
import { UploadPage } from '../upload/upload';
import { PlayerPage } from '../player/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    // private photoViewer: PhotoViewer,
    public mediaProvider: MediaProvider,
    public pipesModule: PipesModule
  ) {}

  ionViewDidEnter() {
    this.showUploadButton = this.mediaProvider.loggedIn;
    this.getAllFiles();
  }

  showUploadButton = false;
  picArray: IPic[];

  getAllFiles = () => {
    this.mediaProvider
      .getAllFilesByTag(this.mediaProvider.tag)
      .subscribe(res => {
        this.picArray = res.reverse();
      });
  };

  showFullImage = (item: IPic) => {
    /*
    this.photoViewer.show(
      this.mediaProvider.mediaUploads + item.filename,
      item.title
    );
    */

    this.navCtrl
      .push(PlayerPage, {
        id: item.file_id
      })
      .catch(console.error);
  };

  goToUpload = () => {
    this.navCtrl.push(UploadPage).catch(console.error);
  };
}
