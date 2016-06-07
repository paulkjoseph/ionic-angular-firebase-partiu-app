import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/sobre/sobre.component.html',
})
export class SobrePage implements OnInit {
  
  titulo: string = "Sobre";
  
  private mensagenErro: any;
  
  constructor(private _app: App, 
              private _navParams: NavParams, 
              private _viewCtrl: ViewController) {
  }
   
  ngOnInit(): void {
  }
  
  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }

  dismiss() {
      this._viewCtrl.dismiss(this.titulo);
  }
  
}
