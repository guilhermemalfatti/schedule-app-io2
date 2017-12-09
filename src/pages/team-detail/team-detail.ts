import { Component } from '@angular/core';
import {ToastController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {GamePage} from '../pages'

import * as _ from 'lodash';
import * as moment from 'moment';

import {EliteApi} from '../../shared/shared'

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  useDateFilter = false;
  allGames: any[];
  dateFilter: string;
  team: any;
  games: any[];
  teamStanding: any;
  isFollowing = false;
  private tourneyData: any;
  constructor(public  navCtrl: NavController, 
              public  navParams: NavParams,
              private eliteAPI: EliteApi,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteAPI.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g =>{
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentname = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return({
                      gameId: g.id,
                      opponent: opponentname,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationURL: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1? "vs" : "at")
                    });
                  })
                  .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id});
    
    console.log('[APP] games: ', this.games);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L";
      return winIndicator + teamScore + " - " + opponentScore;
    }else{
      return "";
    }
  }


  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);

  }

  dataChamnge(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }else{
      this.games = this.allGames;
    }    
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger'
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertCtrl.create({
        title: 'Unfollow',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'yes',
            handler:() => {
              this.isFollowing = false;
              //TODO, persit data

              let toast = this.toastCtrl.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();

    }else{
      this.isFollowing = true;
      //TODO, persist data
    }
  }

}
