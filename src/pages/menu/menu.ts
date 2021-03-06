import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';
import { SearchPage } from '../search/search';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  search = SearchPage;
  home = HomePage;
  login = LoginRegisterPage;
  logout = ProfilePage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
}
