import { Component }  from '@angular/core';

import { NavParams, ViewController, Alert, NavController, ActionSheet, Platform } from 'ionic-angular';

import { Item } from '../shared';

@Component({
  templateUrl: 'build/pages/bagagem/bagagem.component.html',
})
export class BagagemPage {

  titulo: string = "Bagagem";
  dados: any;
  bagagem: Item[] = [];
  contador: number = 0;

  private mensagenErro: any;

  constructor(private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _navCtrl: NavController,
    private _platform: Platform) {
    this.dados = _navParams.data;
  }

  ionViewLoaded() {
    this.getBagagem();
  }

  ionViewWillEnter() { }

  ionViewDidEnter() {
    this.gerenciarContador();
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewDidUnload() { }

  salvar(): void {
    this.dismiss();
  }

  incluir(): void {
    let prompt = Alert.create({
      title: 'Bagagem',
      message: "Incluir um novo item na sua bagagem",
      inputs: [
        {
          name: 'item',
          placeholder: 'Ex. Pasta de dente',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.bagagem.push(new Item(data.item, false));
          }
        }
      ]
    });
    this._navCtrl.present(prompt);
  }

  gerenciarContador(): void {
    this.contador = this.bagagem.filter((item: Item) => item.status === true).length;
  }

  gerenciar(item: Item): void {
    let actionSheet = ActionSheet.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this._platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Excluir clicked');
          }
        },
        {
          text: 'Editar',
          icon: !this._platform.is('ios') ? 'create' : null,
          handler: () => {
            this.incluir();
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

  private dismiss() {
    this._viewCtrl.dismiss(this.titulo);
  }

  private getBagagem(): void {
    this.bagagem.push(new Item("RG", false));
    this.bagagem.push(new Item("CPF", false));
    this.bagagem.push(new Item("Passaporte", false));
    this.bagagem.push(new Item("Câmera", false));
    this.bagagem.push(new Item("Carregador de celular", false));
    this.bagagem.push(new Item("Celular", false));
    this.bagagem.push(new Item("Escova de dentes", false));
    this.bagagem.push(new Item("Fones de ouvido", false));
    this.bagagem.push(new Item("Notebook", false));
    this.bagagem.push(new Item("Ipad/Tablet", false));
    this.bagagem.push(new Item("Óculos de sol", false));
    this.bagagem.push(new Item("Perfume", false));
    this.bagagem.push(new Item("Plugues adaptadores", false));
  }

}
