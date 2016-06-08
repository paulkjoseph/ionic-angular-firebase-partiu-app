import { Component, OnInit }  from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';

import { RotaView } from '../rota';

import { MapaPage } from '../mapa';

@Component({
  templateUrl: 'build/pages/rota-detail/rota-detail.component.html'
})
export class RotaDetailPage implements OnInit {

  titulo: string = "Detalhes";
  rota: RotaView;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.rota = this._navParams.data;
  }

  salvar(): void {
    this.dismiss();
  }

  carregarMapa(): void {
    this._navCtrl.push(MapaPage, this.rota);
  }

  private dismiss() {
    this._viewCtrl.dismiss();
  }

}
