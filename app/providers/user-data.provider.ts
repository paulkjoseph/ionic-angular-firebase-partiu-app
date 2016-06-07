import { Injectable } from '@angular/core';

import { Storage, LocalStorage, Events } from 'ionic-angular';

@Injectable()
export class UserDataProvider {

  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);

  constructor(private _events: Events) { }

  hasFavorite(favorite) {
    return (this._favorites.indexOf(favorite) > -1);
  }

  addFavorite(favorite) {
    this._favorites.push(favorite);
  }

  removeFavorite(favorite) {
    let index = this._favorites.indexOf(favorite);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this._events.publish('user:login');
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this._events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this._events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}
