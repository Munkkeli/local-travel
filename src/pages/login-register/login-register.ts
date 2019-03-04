import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html'
})
export class LoginRegisterPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  viewRegister = false;

  error = {
    username: false,
    password: false
  };

  login = {} as { username: string; password: string };
  register = {} as {
    username: string;
    email: string;
    full_name: string;
    password: string;
    re_password: string;
  };

  showErrorToast = (error: string) => {
    const toast = this.toastCtrl.create({
      message: error,
      duration: 3000
    });
    toast.present().catch(console.error);
  };

  checkUsername = async (control: AbstractControl) =>
    new Promise(resolve => {
      if (!control || !control.value) return resolve(null);
      this.mediaProvider.checkUsername(control.value).subscribe(res => {
        if (!res.available) return resolve({ usernameTaken: true });
        return resolve(null);
      });
    });

  checkFieldValidity = (field: string) => {
    return (
      this.registerForm.controls[field].invalid &&
      this.registerForm.controls[field].dirty &&
      this.registerForm.controls[field].touched &&
      this.registerForm.value[field]
    );
  };

  registerForm = new FormGroup({
    username: new FormControl(
      '',
      [Validators.required, Validators.minLength(3)],
      this.checkUsername
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    full_name: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    re_password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      (control: AbstractControl) => {
        if (!control.parent) return null;
        if (control.parent.value.password !== control.value) {
          return { passwordMatch: true };
        }
        return null;
      }
    ])
  });

  loginFormSubmit = (data?: { username: string; password: string }) => {
    this.mediaProvider.login(data || this.login).subscribe(
      res => {
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.login = {} as any;
        this.navCtrl.push(HomePage).catch(console.error);
      },
      error => {
        console.error(error);
        this.showErrorToast('Invalid credentials');
      }
    );
  };

  registerFormSubmit = () => {
    this.mediaProvider
      .register({
        ...this.registerForm.value,
        re_password: undefined
      })
      .subscribe(
        res => {
          this.viewRegister = false;
          this.loginFormSubmit({
            username: this.registerForm.get('username').value,
            password: this.registerForm.get('password').value
          });
          this.registerForm.reset();
        },
        error => {
          console.error(error);
          this.showErrorToast('Something went wrong');
        }
      );
  };

  toggleViewRegister = () => {
    this.viewRegister = !this.viewRegister;
  };
}
