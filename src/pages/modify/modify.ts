import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/mediaInterfaces';
import { FiltersPipe } from '../../pipes/filters/filters';
import { DescriptionPipe } from '../../pipes/description/description';

/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {
  file: Pic;
  fileInfo: any = {
    title: '',
    description: '',
  };
  type = '';
  loading = this.loadingCtrl.create({
    content: 'Saving, please wait...',
  });

  filters = null;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public mediaProvider: MediaProvider,
    public filtersPipe: FiltersPipe,
    public descriptionPipe: DescriptionPipe) {
  }

  save() {
    this.loading.present().catch();
    const description = `[d]${this.fileInfo.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;
    const data = {
      title: this.fileInfo.title,
      description: description + filters,
    };
    this.mediaProvider.modify(data, this.file.file_id,
      localStorage.getItem('token')).
    subscribe(() => {
      // wait for 2 secs for thumbnail creation
      setTimeout(() => {
        this.loading.dismiss().catch();
        this.navCtrl.pop().catch();
      }, 2000);
    }, error1 => {
      this.loading.dismiss().catch();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPage');
    this.mediaProvider.getFile(this.navParams.get('fileId')).subscribe(
      (file: Pic) => {
        this.file = file;
        this.fileInfo.title = file.title;
        this.fileInfo.description = this.descriptionPipe.transform(
          file.description);
        this.filters = this.filtersPipe.transform(file.description);
        console.log(this.filters);
      });
  }

}
