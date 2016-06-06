import { OnInit }  from '@angular/core';
import { Page, NavParams, NavController, Modal, Platform, ActionSheet, Alert } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { AgendaView, AgendaFilterPipe, AgendaService } from '../agenda';
import { AgendaDetailPage } from '../agenda-detail';
import { PreferenciaPage } from '../preferencia';
import { MapaPage } from '../mapa';
import { RotaPage } from '../rota';

@Page({
  templateUrl: 'build/pages/historico/historico-list.component.html',
  pipes: [ AgendaFilterPipe ]
})
export class HistoricoListPage implements OnInit {
  
  titulo: string = "Históricos";
  agendas: AgendaView[] = [];
  dados: any;
  filtro: string = '';
  segment: string = 'todas';
  mensagenErro: any;
  
  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _platform: Platform,
              private _service: AgendaService,
              public _globalMethod: GlobalMethodService) {
    this.dados = this._navParams.data;
  }
  
  ngOnInit(): void {
    this.getAgendas(false);
  }
  
  atualizarLista(): void {
    this.getAgendas(this.segment === 'favoritas');
  }
  
  carregarPreferencias(): void {
      this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }
  
  carregarMapa(agenda: AgendaView): void {
      this._navCtrl.push(MapaPage, agenda);
  }
  
  carregarRotas(agenda: AgendaView): void {
      this._globalMethod.carregarPagina(RotaPage, agenda, true, this._navCtrl);
  }
  
  carregarAgendaDetail(agenda: AgendaView): void {
      this._globalMethod.carregarPagina(AgendaDetailPage, agenda, true, this._navCtrl);
  }
  
  atualizar(refresher) {
    //-- TODO
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
  gerenciar(agenda: AgendaView): void {
    let actionSheet = ActionSheet.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.excluir(agenda);
          }
        },
        {
          text: 'Reagendar',
          icon: !this._platform.is('ios') ? 'redo' : null,
          handler: () => {
            this.carregarAgendaDetail(agenda);
          }
        },
        {
          text: 'Compartilhar',
          icon: !this._platform.is('ios') ? 'share' : null,
          handler: () => {
            //-- TODO
            console.log('Compartilhar clicked');
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
  
  excluir(agenda: AgendaView): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: `Deseja realmente excluir agenda ${agenda.descricao}?`,
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
            //-- TODO
            console.log('Sim clicked');
          }
        }
      ]
    });
    this._navCtrl.present(confirm);
  }
  
  private getAgendas(isFavorito: boolean): void {
    this._service.getAgendasRealidas(isFavorito)
                  .subscribe((data: AgendaView[]) => this.agendas = data, 
                              error =>  this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl));
  }
  
}
