import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyTeamsPage, TeamHomePage, TournamentsPage} from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    UserSettings
  ]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoritesTeams: any;

  //pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private userSetitngs: UserSettings,
    private eliteAPI: EliteApi,
    private events: Events,
    private loadingCtrl: LoadingController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavories();

      this.events.subscribe('favorite:chenge', () => this.refreshFavories());
    });
  }

  refreshFavories(){
    this.userSetitngs.getallFavorites().then(value => this.favoritesTeams = value)
  }

  goToTeam(favorite){
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteAPI.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team))
  }

  /*openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }*/
  goHme(){
    this.nav.popToRoot();
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}
