import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { IPic, IUser } from '../../interfaces/media';
import { LogoutPage } from '../logout/logout';
import { PlayerPage } from '../player/player';
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
  userUploads: IPic[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidEnter() {
    this.loadUserInformation();
    this.getUserUploads();
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
    const defaultProfileImg = '../../assets/imgs/default-profile.png';
    const img = document.getElementById('user-profile-img');
    this.mediaProvider.getAllFilesByTag('profile').subscribe(res => {
      const image = res.find(x => x.user_id === user_id);
      this.profilePicture = image
        ? this.mediaProvider.mediaUploads + image.filename
        : defaultProfileImg;
      img.setAttribute('src', `${this.profilePicture}`);
    });
  };

  getUser = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) return;
    this.userInformation = user;
    this.loadProfilePicture(user.user_id);
    return user.user_id;
  };

  getUserUploads = () => {
    const id = this.getUser();
    this.mediaProvider.getUserMedia(id).subscribe(uploads => {
      if (uploads.length === 0) {
        const defaultPhoto = '../../assets/imgs/photo.svg';
        const uploadsContainer = document.getElementById('uploads');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        const img = document.createElement('img');
        img.setAttribute('src', `${defaultPhoto}`);
        imgContainer.appendChild(img);
        uploadsContainer.appendChild(imgContainer);
      }
      console.log(uploads.length);
      this.userUploads = uploads
        .filter(x => {
          try {
            return JSON.parse(x.description).isLocalTravel;
          } catch (e) {
            return false;
          }
        })
        .reverse();
    });
  };

  showFullImage = (item: IPic) => {
    this.navCtrl
      .push(PlayerPage, {
        id: item.file_id
      })
      .catch(console.error);
  };

  logout = () => {
    this.navCtrl.push(LogoutPage).catch(console.error);
  };
}
