import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { UsuarioView } from './';

@Component({
  templateUrl: 'build/pages/usuario/usuario-signup.component.html',
})
export class UsuarioSignUpPage implements OnInit {

  titulo: string = "Login";
  dados: any;
  usuario: UsuarioView = new UsuarioView();
  mensagenErro: any;

  constructor(private _app: App,
    private _navParams: NavParams,
    private _viewCtrl: ViewController) {
    this.dados = this._navParams.data;
  }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }

  login() {
    this.dismiss();
  }

  criarConta() {
    this.dismiss();
  }

  dismiss(): void {
    this._viewCtrl.dismiss(this.titulo);
  }

}
