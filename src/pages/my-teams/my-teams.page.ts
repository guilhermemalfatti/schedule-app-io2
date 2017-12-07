import { Component } from '@angular/core';
import {LoadingController, NavController } from 'ionic-angular';

import {TeamHomePage, TournamentsPage} from '../pages';

import {EliteApi} from '../../shared/shared';


@Component({
  templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

  favorites = [
       {
           team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
           tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
           tournamentName: 'March Madness Tournament'
       },
       {
           team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
           tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
           tournamentName: 'Holiday Hoops Challenge'
       }
   ];

  constructor(private nav: NavController,
              private eliteAPI: EliteApi,
              private loadingCtrl: LoadingController) { }

  favoriteTapped(event, favorite){
    let loader = this.loadingCtrl.create({
      content: "Getting data...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteAPI.getTournamentData(favorite.tournamentId)
    .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
  }

  gotToTorunament(){
    this.nav.push(TournamentsPage);
  }
}
