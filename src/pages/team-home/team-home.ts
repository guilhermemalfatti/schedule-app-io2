import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {StandingsPage, TeamDetailPage} from '../pages'

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  team: any;
  teamDetailtab = TeamDetailPage;
  standingTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

}
