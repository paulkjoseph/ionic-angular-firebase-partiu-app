import { OnInit }  from '@angular/core';
import { Page, NavParams, NavController, Platform, ActionSheet, Alert } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { Historico, HistoricoService, HistoricoListPage } from './';

import { PreferenciaPage } from '../preferencia';
import { AgendaView } from '../agenda';

@Page({
  templateUrl: 'build/pages/historico/historico.component.html'
})
export class HistoricoPage implements OnInit {
  
  titulo: string = "Históricos";
  historicos: Historico[] = [];
  rows: number[] = [];
  dados: any;
  filtro: string = '';
  mensagenErro: any;
  
  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _platform: Platform,
              private _service: HistoricoService,
              public _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }
  
  ngOnInit(): void {
    this.getHistoricos();
  }
  
  onPageDidEnter() {
  }
  
  carregarAgendas(historico: Historico): void {
      this._globalMethod.carregarPagina(HistoricoListPage, historico, true, this._navCtrl);
  }
  
  carregarPreferencias(): void {
      this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }
  
  atualizar(refresher) {
    //-- TODO
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
  gerenciar(historico: Historico): void {
    let actionSheet = ActionSheet.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir Agendas',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.excluir(historico);
          }
        },
        {
          text: 'Visualizar Agendas',
          icon: !this._platform.is('ios') ? 'open' : null,
          handler: () => {
            this.carregarAgendas(historico);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', 
          icon: !this._platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancelar clicked');
          }
        }
      ]
    });
    this._navCtrl.present(actionSheet);
  }
  
  excluir(historico: Historico): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: `Deseja realmente excluir todas agendas do tipo ${historico.descricao}?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Sim clicked');
          }
        }
      ]
    });
    this._navCtrl.present(confirm);
  }
  
  private getHistoricos(): void {
    this._service.getHistoricos()
                  .subscribe((data: Historico[]) => this.rows = Array.from(Array(Math.ceil((this.historicos = data).length / 2)).keys()), 
                              error =>  this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl) );
  }
  
}