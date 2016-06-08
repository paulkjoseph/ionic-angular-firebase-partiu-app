import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/configuracao/configuracao.component.html',
})
export class ConfiguracaoPage implements OnInit {

  titulo: string = "Configurações";
  dados: any;
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

  salvar(): void {
    this.dismiss();
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

}
