import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/compartilhar/compartilhar.component.html',
})
export class CompartilharPage implements OnInit {

  titulo: string = "Compartilhar";
  dados: any;

  private mensagenErro: any;

  constructor(private _app: App,
    private _navParams: NavParams,
    private _viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.dados = this._navParams.data;
  }

  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

}
