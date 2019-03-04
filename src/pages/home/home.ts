import { Component, ViewChild } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/mediaInterfaces';
import { Observable } from 'rxjs';
import { UploadPage } from '../upload/upload';
import { PlayerPage } from '../player/player';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;

  picArray: Observable<Pic[]>;
  start = 0;

  constructor(
    public navCtrl: NavController, public mediaProvider: MediaProvider) {

  }

  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia(this.start);
  }

  doRefresh(refresher) {
    this.start = 0;
    this.getAllFiles();
    this.picArray.subscribe(() => {
      console.log('refresh complete');
      refresher.complete();
    });
  }

  showFile(file) {
    this.mediaProvider.refresh = false;
    this.navCtrl.push(PlayerPage, { fileId: file }).catch();
  }

  loadMore() {
    this.start += 20;
    this.picArray = combineLatest(
      this.picArray,
      this.mediaProvider.getAllMedia(this.start),
      (...arrays) => arrays.reduce((acc, array) => {
        return [...acc, ...array];
      }, [])
    );
    console.log('fiksi');
    setTimeout(() => {
      this.content.scrollTo(0, this.start * 96 - 96, 400).catch();
      console.log(this.content.scrollTop);
    }, 200);
  }

  openUpload() {
    console.log('go to upload');
    this.mediaProvider.refresh = false;
    this.navCtrl.push(UploadPage).catch();
  }

  ionViewDidEnter() {
    if (this.mediaProvider.refresh) {
      this.start = 0;
      this.getAllFiles();
    }
  }

}
