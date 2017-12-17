import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/shared';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.loadMap(location);
  }
  loadMap(location) {
    
    let options = {
      center: new google.maps.LatLng(location.latitude, location.longitude),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //https://www.gajotres.net/ionic-2-integrating-google-maps/2/
    this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
        
  }

}
