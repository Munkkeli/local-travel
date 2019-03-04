import { Component } from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Login, UserCreated } from '../../interfaces/mediaInterfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../../validators/username-validator';
import { PasswordMatchValidator } from '../../validators/password-match-validator';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  userAlert = false;

  user: any = {};

  showRegister = false;

  submitAttempt = false;

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public usernameValidator: UsernameValidator) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9_-]*'),
          Validators.required]),
        usernameValidator.checkUsername.bind(usernameValidator)],
      email: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.pattern(
            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
          Validators.required])],
      full_name: ['', Validators.compose([Validators.pattern('[a-zA-Z- ]*')])],
      password: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required])],
      verifyPassword: ['', Validators.compose([Validators.required])],
    }, {
      validator: PasswordMatchValidator('password', 'verifyPassword'),
    });
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK'],
    });
    alert.present().catch();
  }

  login() {
    console.log(this.user);
    this.mediaProvider.login(this.user).subscribe((data: Login) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      this.mediaProvider.user = data.user;
      this.mediaProvider.logged = true;
      this.navCtrl.parent.select(0);
    }, error => {
      console.log(error);
      this.showAlert(error.statusText);
    });
  }

  register() {
    this.submitAttempt = true;
    if (!this.registerForm.valid) {
      this.showAlert('Form not valid!');
    } else {
      delete this.registerForm.value.verifyPassword;
      this.user = this.registerForm.value;
      this.mediaProvider.register(this.user).subscribe(
        (data: UserCreated) => {
          this.login();
        }, error => {
          console.log(JSON.stringify(error));
          this.showAlert(error.statusText);
        });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

}
