import { OnInit }  from '@angular/core';

import { IonicApp, Page, NavParams, ViewController } from 'ionic-angular';

import { UsuarioView } from './';

@Page({
  templateUrl: 'build/pages/usuario/usuario-signup.component.html',
})
export class UsuarioSignUpPage implements OnInit {
  
  titulo: string = "Login";
  dados: any;
  usuario: UsuarioView = new UsuarioView(); 
  mensagenErro: any;
  
  constructor(private _app: IonicApp, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
    this.dados = this._navParams.data;
  }
   
  ngOnInit(): void {
  }
  
  onPageDidEnter() {
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
