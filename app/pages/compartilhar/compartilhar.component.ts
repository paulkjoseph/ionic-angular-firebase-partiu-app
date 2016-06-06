import { OnInit }  from '@angular/core';

import { IonicApp, Page, NavParams, ViewController } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/compartilhar/compartilhar.component.html',
})
export class CompartilharPage implements OnInit {
  
  titulo: string = "Compartilhar";
  dados: any;
  
  private mensagenErro: any;
  
  constructor(private _app: IonicApp, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
  }
   
  ngOnInit(): void {
    this.dados = this._navParams.data;
  }
  
  onPageDidEnter() {
    this._app.setTitle(this.titulo);
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
