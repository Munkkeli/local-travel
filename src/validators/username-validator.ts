import { FormControl } from '@angular/forms';
import { UserExists } from '../interfaces/mediaInterfaces';
import { MediaProvider } from '../providers/media/media';
import { Injectable } from '@angular/core';

@Injectable()
export class UsernameValidator {

  constructor(public mediaProvider: MediaProvider) {

  }

  checkUsername(control: FormControl): any {

    return new Promise(resolve => {

      this.mediaProvider.checkUser(control.value).
      subscribe((data: UserExists) => {
        console.log(data.available);
        if (data.available) {
          resolve(null);
        } else {
          resolve('username taken');
        }
      });
    });
  }

}
