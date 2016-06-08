import { Component, OnInit }  from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { Tutorial } from './';

import { TutorialDataProvider } from '../../providers/tutorial-data.provider';

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.component.html'
})
export class TutorialPage implements OnInit {

  titulo: string = "Tutorial";

  tutorials: Tutorial[] = [];
  dados: any;

  private mensagenErro: any;

  constructor(private _app: App,
    private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _dataProvider: TutorialDataProvider) {
  }

  ngOnInit(): void {
    this.dados = this._navParams.data;
    this.getTutorials();
  }

  ionViewDidEnter() {
    this._app.setTitle(this.titulo);
  }

  dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getTutorials(): void {
    this.tutorials = this._dataProvider.getTutorials();
  }

}
