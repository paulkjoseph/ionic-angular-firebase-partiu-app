import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { UsuarioView, UsuarioService } from './';

@Component({
  templateUrl: 'build/pages/usuario/usuario-profile.component.html',
})
export class UsuarioProfilePage implements OnInit {
  
  titulo: string = "Perfil";
  usuario: UsuarioView; 
  dados: any;
  mensagenErro: any;
  
  constructor(private _app: App, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController,
              private _service: UsuarioService) {
    this.dados = this._navParams.data;
  }
   
  ngOnInit(): void {
    this.getUsuario(); 
  }
  
  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }
  
  salvar() {
      this.dismiss();
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.dados);
  }
  
  private getUsuario() {
    this._service.getUsuario("wacujuguna@gmail.com")
                  .subscribe((data: UsuarioView) => this.usuario = data, 
                              error =>  this.mensagenErro = <any>error );
  }
}
