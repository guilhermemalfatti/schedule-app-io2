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


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteAPI: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneydata = this.eliteAPI.getCurrentTourney();
    let team = tourneydata.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections(){
    //TODO
  }

  goToMap(){
    //TODO
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2) ? 'secondary' : '';
  }

}
