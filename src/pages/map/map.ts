import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/shared';

declare var google;
declare var window: any;

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
  loadMap(location, ) {
    
    let options = {
      center: new google.maps.LatLng(location.latitude, location.longitude),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //https://www.gajotres.net/ionic-2-integrating-google-maps/
    this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
    this.showMyLocation();
  }

    /*
     * This function will create and show a marker representing your location
     */
    showMyLocation(){
      
      let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
      });

      let markerInfo = "<h4>You are here!</h4>";         

      let infoModal = new google.maps.InfoWindow({
          content: markerInfo
      });

      google.maps.event.addListener(marker, 'click', () => {
          infoModal.open(this.map, marker);
      });
    }

    getDirections(){
      window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
    }

}
