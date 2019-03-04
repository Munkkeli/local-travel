import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginRegisterPage } from '../login-register/login-register';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/mediaInterfaces';

/**
 * Generated class for the MenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homeRoot: any = HomePage;
  profileRoot: any = ProfilePage;
  loginRegisterRoot: any = LoginRegisterPage;

  constructor(
    public navCtrl: NavController, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    if (localStorage.getItem('token') !== null) {
      console.log('autologin');
      this.mediaProvider.checkToken().subscribe((data: User) => {
        this.mediaProvider.logged = true;
        this.mediaProvider.user = data;
      });
    }
  }

}
