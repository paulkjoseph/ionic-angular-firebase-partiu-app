import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/desenvolvimento/desenvolvimento.component.html',
})
export class DesenvolvimentoPage implements OnInit {
  
  titulo: string = "Em Desenvolvimento";
  dados: any;
  
  private mensagenErro: any;
  
  constructor(private _app: App, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
    this.dados = _navParams.data;
  }
   
  ngOnInit(): void {
    this.titulo = this.dados.title.length === 0 ? this.titulo : this.dados.title;
  }
  
  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
