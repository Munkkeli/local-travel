import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { MyFilesPage } from '../my-files/my-files';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  logout() {
    localStorage.clear();
    this.mediaProvider.logged = false;
    this.navCtrl.parent.select(0);
  }

  showMyFiles() {
    this.navCtrl.push(MyFilesPage).catch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
