import 'es6-shim';

import { ViewChild, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { App, Events, Platform, Nav, MenuController, Modal, Alert } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Menu, MenuItem, GlobalMethodService, GlobalVariableService } from './pages/shared';
import { UserDataProvider, MenuDataProvider, TutorialDataProvider, FirebaseDataProvider } from './providers';

import { PreferenciaService } from './pages/preferencia';
import { AgendaService } from './pages/agenda';
import { UsuarioService } from './pages/usuario';
import { HistoricoService } from './pages/historico';
import { NotificacaoService } from './pages/notificacao';
import { RotaService } from './pages/rota';

import { UsuarioLoginPage } from './pages/usuario';

@App({
  templateUrl: 'build/app.html',
  providers: [UserDataProvider, 
              MenuDataProvider,
              TutorialDataProvider,
              FirebaseDataProvider,
              PreferenciaService,
              AgendaService,
              UsuarioService,
              HistoricoService,
              NotificacaoService,
              RotaService,
              GlobalMethodService, 
              GlobalVariableService,
              HTTP_PROVIDERS],
  config: {
    backButtonText: 'Voltar',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Juno', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ],
    dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
  }
})
class PartiuApp implements OnInit {
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = UsuarioLoginPage;
  menuPages: Menu[];
  showPage: boolean = false;
  
  constructor(private _events: Events,
              private _userData: UserDataProvider, 
              private _menuData: MenuDataProvider,
              private _platform: Platform,
              private _menu: MenuController) { 
  }
  
  ngOnInit(): void {
    this._platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.menuPages = this._menuData.getMenuPages();
    
    this._userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }
  
  onPageDidEnter() {
  }

  openPage(page: MenuItem) {
    if (page.title.indexOf("Logout") !== -1) {
      this.confirmarLogout();
    } else {
      this.nav.push(page.component, {title: page.title});
    }
  }

  confirmarLogout() {
    let confirm = Alert.create({
      title: 'Logout',
      message: 'Deseja realmente realizar logout?',
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
            this.logout();
          }
        }
      ]
    });
    this.nav.present(confirm);
  }
  
  listenToLoginEvents() {
    this._events.subscribe('user:initApp', () => {
      this.showPage = true;
    });
    
    this._events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this._events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this._events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this._menu.enable(loggedIn, 'loggedInMenu');
    this._menu.enable(!loggedIn, 'loggedOutMenu');
  }
  
  private logout(): void {
    setTimeout(() => {
        this._userData.logout();
      }, 1000);
  }

}
