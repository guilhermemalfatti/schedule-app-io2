import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  standings: any[];
  team: any;
  allStandings: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteAPI: EliteApi) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteAPI.getCurrentTourney();
    this.standings = tourneyData.standings;

    console.log('[APP] standings', this.standings);
  }

  getheader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;  
  }

}
