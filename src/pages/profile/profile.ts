import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { IUser } from '../../interfaces/media';
import { LogoutPage } from '../logout/logout';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profilePicture: string;
  userInformation: IUser = {} as any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.loadUserInformation();
  }

  loadUserInformation = () => {
    const user = JSON.parse(
      localStorage.getItem('user') || 'null'
    ) as IUser | null;
    if (!user) return;

    this.userInformation = user;
    this.loadProfilePicture(user.user_id);
  };

  loadProfilePicture = (user_id: number) => {
    this.mediaProvider.getAllFilesByTag('profile').subscribe(res => {
      const image = res.find(x => x.user_id === user_id);
      if (image) this.profilePicture = image.filename;
    });
  };

  logout = () => {
    this.navCtrl.push(LogoutPage).catch(console.error);
  };
}
