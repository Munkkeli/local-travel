import { Component } from '@angular/core';
import {
  LoadingController,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Chooser } from '@ionic-native/chooser';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface IUpload {
  title?: string;
  description?: string;
}

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  upload: IUpload = {};
  image: any;
  file: any = null;
  blob: any = null;

  showChooser = false;
  preview = false;

  changed = false;
  style = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0
  };
  filter = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
    private chooser: Chooser,
    public plt: Platform
  ) {
    this.showChooser = !plt.is('core');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    console.log(`show chooser: ${this.showChooser}`);
  }

  handleFileChoose = () => {
    this.chooser
      .getFile('image/*,video/*,audio/*')
      .then(file => {
        if (!file) return;

        const blob = new Blob([file.data], {
          type: file.mediaType
        });

        this.blob = blob;
        this.showPreview(blob, file.mediaType);
      })
      .catch(console.error);
  };

  handleClear = () => {
    this.upload.title = '';
    this.upload.description = '';
    this.file = '';
    this.blob = '';
    this.preview = false;

    this.style = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0
    };
  };

  handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.showPreview(event.target.files[0], event.target.files[0].type);
    }
  };

  handleStyleChange = () => {
    this.filter = `brightness(${this.style.brightness}%) contrast(${
      this.style.contrast
    }%) saturate(${this.style.saturation}%) sepia(${this.style.sepia}%)`;

    this.changed = true;
  };

  showPreview = (file, mimeType: string) => {
    if (mimeType.split('/')[0] !== 'image') {
      return;
    }

    this.preview = true;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  uploadFormSubmit = () => {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch(console.error);

    let description = `[d]${this.upload.description || ''}[/d]`;
    if (this.changed) {
      description += `[f]${JSON.stringify(this.style)}[/f]`;
    }

    const data = new FormData();
    data.append('title', this.upload.title || '');
    data.append('description', description);
    data.append('file', this.file || this.blob);

    const moveOn = () => {
      this.file = null;
      this.blob = null;

      setTimeout(() => {
        loading.dismiss().catch(console.error);
        this.navCtrl.pop().catch(console.error);
      }, 2000);
    };

    this.mediaProvider.upload(data).subscribe(res => {
      this.mediaProvider.addTag(res.file_id, 'test-lt').subscribe(res2 => {
        moveOn();
      });

      /*
      if (this.changed) {
        this.mediaProvider
          .addTag(res.file_id, `filter: ${this.filter}`)
          .subscribe(res2 => {
            moveOn();
          });
      } else {
        moveOn();
      }
      */
    });
  };
}
