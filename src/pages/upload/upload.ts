import { Component } from '@angular/core';
import {
  LoadingController,
  NavController,
  NavParams, Platform, normalizeURL,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from '@ionic-native/file-transfer';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  imagedata: any;
  file: any;
  fileInfo: any = {
    title: '',
    description: '',
  };
  type = '';
  hidePreview = true;
  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });

  filters = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public mediaProvider: MediaProvider,
    public camera: Camera, public platform: Platform,
    public fileTransfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  openGallery() {
    const options: CameraOptions = {
      sourceType: 0,
      quality: 50,
      mediaType: 2,
    };

    this.camera.getPicture(options).then(imagePath => {
      console.log(imagePath);

      this.imagedata = normalizeURL(imagePath);
      console.log(this.imagedata);
      if (this.imagedata.includes('jpg')) {
        this.type = 'image/jpeg';
      } else {
        this.type = 'video/mp4';
        this.imagedata = 'http://via.placeholder.com/640x320/000?text=Audio / Video';
      }
      this.hidePreview = false;
      this.file = imagePath;
    }).catch();
  }

  upload() {
    this.loading.present().catch();
    const description = `[d]${this.fileInfo.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    const options: FileUploadOptions = {
      mimeType: this.type,
      headers: {
        'x-access-token':
          localStorage.getItem('token'),
      },
      params: {
        'title': this.fileInfo.title,
        'description': description + filters,
      },
    };

    fileTransfer.upload(this.file, this.mediaProvider.baseUrl + '/media',
      options).then((data) => {
      console.log('OUKEI', data);
      setTimeout(() => {
        this.loading.dismiss().catch();
        this.mediaProvider.refresh = true;
        this.navCtrl.pop().catch();
      }, 2000);
    }, (err) => {
      console.log('virhe', err);
      this.loading.dismiss().catch();
    });
  }
}
