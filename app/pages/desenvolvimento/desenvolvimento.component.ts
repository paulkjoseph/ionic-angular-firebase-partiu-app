import { OnInit }  from '@angular/core';

import { IonicApp, Page, NavParams, ViewController } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/desenvolvimento/desenvolvimento.component.html',
})
export class DesenvolvimentoPage implements OnInit {
  
  titulo: string = "Em Desenvolvimento";
  dados: any;
  
  private mensagenErro: any;
  
  constructor(private _app: IonicApp, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
    this.dados = _navParams.data;
  }
   
  ngOnInit(): void {
    this.titulo = this.dados.title.length === 0 ? this.titulo : this.dados.title;
  }
  
  onPageDidEnter() {
    this._app.setTitle(this.titulo);
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
