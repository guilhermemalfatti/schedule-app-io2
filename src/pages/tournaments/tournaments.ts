import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {TeamsPage} from '../pages'
import {EliteApi} from '../../shared/shared'

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;
  constructor(private navCtrl: NavController, private aliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.aliteApi.getTournaments().then(data => this.tournaments = data);
  }

  itemTapped(event, toruney){
    this.navCtrl.push(TeamsPage, toruney);
  }
}
