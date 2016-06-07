import { Component, OnInit }  from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AgendaPage } from '../agenda';
import { MapaPage } from '../mapa';
import { HistoricoPage } from '../historico';
import { NotificacaoPage } from '../notificacao';

@Component({
  templateUrl: 'build/pages/principal/principal.component.html'
})
export class PrincipalPage implements OnInit {
  
  selectedIndex: number;
  
  tab1Root: any = AgendaPage;
  tab2Root: any = MapaPage;
  tab3Root: any = HistoricoPage;
  tab4Root: any = NotificacaoPage;

  constructor(private _navParams: NavParams) {
  }
  
  ngOnInit(): void {
    this.selectedIndex = this._navParams.data.tabIndex || 0;
  }
  
}
