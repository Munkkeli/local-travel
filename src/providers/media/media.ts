import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Login,
  Pic, User,
  UserCreated,
  UserExists,
} from '../../interfaces/mediaInterfaces';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  logged = false;
  user: User;
  refresh = true;

  baseUrl = 'https://media.mw.metropolia.fi/wbma';
  imageUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }

  getAllMedia(start) {
    return this.http.get<Pic[]>(this.baseUrl + `/media?start=${start}limit=20`);
  }

  getFile(id) {
    // single file
    return this.http.get<Pic>(this.baseUrl + '/media/' + id);
  }

  login(userdata) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Login>(this.baseUrl + '/login', userdata,
      httpOptions);
  }

  checkUser(username) {
    return this.http.get<UserExists>(
      this.baseUrl + '/users/username/' + username);
  }

  getUser(id, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get<User>(this.baseUrl + '/users/' + id, settings);
  }

  register(userdata) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<UserCreated>(this.baseUrl + '/users', userdata,
      httpOptions);
  }

  checkToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.baseUrl + '/users/user',
      httpOptions);
  }

  getFilesByTag(tag) {
    // single file
    return this.http.get<Pic[]>(this.baseUrl + '/tags/' + tag);
  }

  upload(formData, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.baseUrl + '/media', formData, settings);
  }

  getFilesByUser(token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get<Pic[]>(this.baseUrl + '/media/user', settings);
  }

  modify(data, id, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.put(this.baseUrl + '/media/' + id, data, settings);
  }

  delete(id, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.delete(this.baseUrl + '/media/' + id, settings);
  }

}
