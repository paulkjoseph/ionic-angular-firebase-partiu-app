import { OnInit }  from '@angular/core';

import { IonicApp, Page, NavParams, ViewController } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/configuracao/configuracao.component.html',
})
export class ConfiguracaoPage implements OnInit {
  
  titulo: string = "Configurações";
  dados: any;
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
  
  salvar(): void {
      this.dismiss();
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
