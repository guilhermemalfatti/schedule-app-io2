import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController } from 'ionic-angular';

import {TeamsPage} from '../pages'
import {EliteApi} from '../../shared/shared'


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;
  constructor(private navCtrl: NavController, 
              private aliteApi: EliteApi,
              private loading: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: "getting content..."
      //spinner: 'dots'
    });
    loader.present().then(() => {
      this.aliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
    
  }

  itemTapped(event, toruney){
    this.navCtrl.push(TeamsPage, toruney);
  }
}
