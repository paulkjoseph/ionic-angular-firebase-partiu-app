import { Component, OnInit }  from '@angular/core';

import { NavParams, NavController, Modal } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { PreferenciaPage } from '../preferencia';

@Component({
  templateUrl: 'build/pages/mapa/mapa.component.html'
})
export class MapaPage implements OnInit {
  
  titulo: string = "Mapa";
  mapa: any;
  dados: any;
  mensagenErro: any;
  
  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _globalMethod: GlobalMethodService)  {
    this.dados = this._navParams.data;
  }
  
  ngOnInit(): void {
    this.carregarMapa();
  }
  
  ionViewDidEnter() {
  }

  carregarPreferencias(): void {
    this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }
  
  private carregarMapa(): void {
    let latLng = new google.maps.LatLng(-21.180555, -47.831665);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.mapa = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
  
}
