import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {TeamHomePage} from '../pages';
import {EliteApi} from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  /* teams = [
    {id: 1, name: 'HC Elite'},
    {id: 2, name: 'Team Takeover'},
    {id: 1, name: 'DC Thunder'}
  ]; */

  teams = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteAPI: EliteApi) {}

  ionViewDidLoad() {
    let selectedTourney =this.navParams.data;

    console.log('[APP] tourney: ' + selectedTourney.id);

    this.eliteAPI.getTournamentData(selectedTourney.id).subscribe(data => {
      this.teams = data.teams;
    });
  }

  itemTapped(event, team){
    console.log("[APP] team tapped: " + team.name);
    //console.log(team);
    this.navCtrl.push(TeamHomePage, team);

  }

}
