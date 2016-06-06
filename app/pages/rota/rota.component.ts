import { OnInit }  from '@angular/core';

import { Page, NavParams, NavController, Alert } from 'ionic-angular';

import { GlobalMethodService } from '../shared';

import { RotaView, RotaService } from './';
import { AgendaView } from '../agenda';

import { RotaCreatePage, RotaDetailPage } from '../rota-detail';
import { MapaPage } from '../mapa';

@Page({
  templateUrl: 'build/pages/rota/rota.component.html'
})
export class RotaPage implements OnInit {
  
  titulo: string = "Rotas";
  agenda: AgendaView;
  mensagenErro: any;
  
  constructor(private _navParams: NavParams,
              private _navCtrl: NavController,
              private _service: RotaService,
              public _globalMethod: GlobalMethodService)  {
    this.agenda = _navParams.data;
  }
  
  ngOnInit(): void {
    this.getRotas();
  }
  
  incluir(): void {
    this._navCtrl.push(RotaCreatePage, this.agenda);
  }
  
  navegarNoMapa(rota: RotaView): void {
      this._navCtrl.push(MapaPage, rota);
  }
  
  carregarMapa(rota: RotaView): void {
      this._navCtrl.push(MapaPage, rota);
  }
  
  gerenciarRota(rota: RotaView): void {
      this._navCtrl.push(RotaDetailPage, rota);
  }
  
  excluir(rota: RotaView): void {
    let confirm = Alert.create({
      title: 'Excluir',
      message: 'Deseja realmente excluir essa rota?',
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
  
  private getRotas(): void {
     this._service.getRotas(this.agenda.id)
                  .subscribe((data: RotaView[]) => this.agenda.rotas = data, 
                              error =>  this._globalMethod.mostrarErro(this.mensagenErro = <any>error, this._navCtrl) );
  }
}