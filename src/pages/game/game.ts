import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/shared';
import {TeamHomePage} from '../pages';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any;
  teamName1: any;
  teamName2: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteAPI: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.teamName1 = this.game.team1;
    this.teamName2 = this.game.team2;
    console.log('[APP] gamePage - game: ' + this.game);
    console.log(this.game);
  }

  teamTapped(teamId){
    let tourneydata = this.eliteAPI.getCurrentTourney();
    let team = tourneydata.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
