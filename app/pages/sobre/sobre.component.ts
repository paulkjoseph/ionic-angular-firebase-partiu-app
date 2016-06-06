import { OnInit }  from '@angular/core';

import { IonicApp, Page, NavParams, ViewController } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/sobre/sobre.component.html',
})
export class SobrePage implements OnInit {
  
  titulo: string = "Sobre";
  
  private mensagenErro: any;
  
  constructor(private _app: IonicApp, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
  }
   
  ngOnInit(): void {
  }
  
  onPageDidEnter() {
    this._app.setTitle(this.titulo);
  }
  
  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
