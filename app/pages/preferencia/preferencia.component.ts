import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController, Platform } from 'ionic-angular';

import { Preferencia, PreferenciaService } from './';

@Component({
  templateUrl: 'build/pages/preferencia/preferencia.component.html'
})
export class PreferenciaPage implements OnInit {
  
  titulo: string = "Prefêrencias";
  isAndroid: boolean = false;
  
  dados: any;
  preferencia: Preferencia = null;
  preferencias: Array<Preferencia> = [];
  
  private mensagenErro: any;
  
  constructor(private _app: App, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController, 
              private _service: PreferenciaService,
              private _platform: Platform) {
    this.isAndroid = _platform.is('android');
    this.dados = _navParams.data;
  }

  ngOnInit(): void {
    this.getPontosDeInteresse();
  }

  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
    this.preferencia = this.preferencias[0];
  }
  
  carregarPreferencia(preferencia: Preferencia): void {
    this.preferencia = preferencia; 
  }
  
  confirmar() {
    this.dismiss();
  }

  dismiss() {
      this._viewCtrl.dismiss();
  }
  
  private getPontosDeInteresse() {
    this._service.getPreferencias()
                  .subscribe( data => this.preferencias = data, 
                              error =>  this.mensagenErro = <any>error );
  }
}
