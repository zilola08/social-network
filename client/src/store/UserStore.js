import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._accessToken = null;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
  
  setAccessToken(accessToken) {
    this._accessToken = accessToken;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get accessToken() {
    return this._accessToken;
  }
}