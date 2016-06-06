import { OnInit, Inject }  from '@angular/core';

import { Page, NavParams, NavController, Modal, Toast } from 'ionic-angular';

import { Usuario, TipoAgenda, GlobalMethodService } from '../shared';
import { AgendaView, AgendaService } from '../agenda';

import { PreferenciaPage } from '../preferencia';
import { RotaPage } from '../rota';

@Page({
  templateUrl: 'build/pages/agenda-detail/agenda-detail.component.html'
})
export class AgendaDetailPage implements OnInit {
  
  titulo: string = "Agenda";
  tiposAgenda: TipoAgenda[] = [];
  agenda: AgendaView = null;
  dados: any;
  
  private mensagenErro: any;
  
  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _service: AgendaService,
              private _globalMethod: GlobalMethodService)  {
    this.dados = _navParams.data;
  }
  
  ngOnInit(): void {
    this.getTiposDeAgenda();
  }
  
  onPageDidEnter() {
    this.inicializarAgenda(this.dados);
  }
  
  confirmar(): void {
      this._globalMethod.carregarPagina(RotaPage, this.agenda, true, this._navCtrl);
  }
  
  limpar(): void {
      this.agenda = new AgendaView(new Usuario(), new TipoAgenda(), "", "", "", "")
  }
  
  carregarPreferencias(): void {
      this._globalMethod.carregarPagina(PreferenciaPage, this.titulo, true, this._navCtrl);
  }
  
  private getTiposDeAgenda() {
    this._service.getTiposDeAgenda()
                  .subscribe( data => this.tiposAgenda = data, 
                              error =>  this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl) );
  }
  
  private inicializarAgenda(agenda: AgendaView): void {
    if (agenda === null || Object.keys(agenda).length === 0 || agenda.id === 0) {
      this.agenda = new AgendaView(new Usuario(), new TipoAgenda(), "", "", "", "")
      this.titulo = "Criar Agenda";
    } else {
      this.agenda = agenda;
      this._service.getTipoAgenda(this.agenda.tipoAgenda.id)
                  .subscribe(data => this.agenda.tipoAgenda = data, 
                              error =>  this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl) );
      this.titulo = "Editar Agenda";
    }
  }
}
