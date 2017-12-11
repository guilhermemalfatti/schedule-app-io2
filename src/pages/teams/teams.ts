import { Component } from '@angular/core';
import {LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import {TeamHomePage} from '../pages';
import {EliteApi} from '../../shared/shared';

import * as _ from 'lodash';

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

  private allteams: any;
  private allteamsDivisions; any;
  teams = [];
  querytext: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteAPI: EliteApi,
              private loaderCtrl: LoadingController) {}

  ionViewDidLoad() {
    let selectedTourney =this.navParams.data;

    console.log('[APP] tourney: ' + selectedTourney.id);

    let  loader = this.loaderCtrl.create({
      content: "Getting data..."
    });
    loader.present().then(() =>{
      this.eliteAPI.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allteams = data.teams;
        this.allteamsDivisions = _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
        .value();
  
        this.teams = this.allteamsDivisions;
        console.log('[APP] division teams', this.teams);
        loader.dismiss();
      });    
    });
  }

  itemTapped(event, team){
    console.log("[APP] team tapped: " + team.name);
    //console.log(team);
    this.navCtrl.push(TeamHomePage, team);

  }

  updateTeams(){
    let queryTextLower = this.querytext.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allteamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if(teams.length){
        filteredTeams.push({divisionName: td.divisionName, divisionTeams: teams});
      }
    });

    this.teams = filteredTeams;
  }

}
