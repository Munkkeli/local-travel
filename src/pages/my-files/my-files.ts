import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { PlayerPage } from '../player/player';
import { Observable } from 'rxjs';
import { Pic } from '../../interfaces/mediaInterfaces';
import { MediaProvider } from '../../providers/media/media';
import { ModifyPage } from '../modify/modify';

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  picArray: Observable<Pic[]>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  showFile(file) {
    this.navCtrl.push(PlayerPage, { fileId: file }).catch();
  }

  modifyFile(id) {
    this.navCtrl.push(ModifyPage, { fileId: id }).catch();
  }

  doDelete(id) {
    console.log('delete this: ', id);
    this.mediaProvider.delete(id, localStorage.getItem('token')).subscribe(
      response => {
        this.getMyFiles();
      });
  }

  deleteFile(id) {
    const alert = this.alertCtrl.create({
      title: 'Notice!',
      subTitle: 'Do you really want to delete a file?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.doDelete(id);
          },
        },
        'Cancel'],
    });
    alert.present().catch();
  }

  getMyFiles() {
    this.picArray = this.mediaProvider.getFilesByUser(
      localStorage.getItem('token'));
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter MyFilesPage');
    this.getMyFiles();
  }

}
