import { Injectable } from "@angular/core";
import {Storage} from '@ionic/storage';
import * as _ from 'lodash';

@Injectable()
export class UserSettings {

    constructor(public storage: Storage){}

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName}

        this.storage.set(team.id, JSON.stringify(item));
    }

    unfavoriteTeam(team){
        this.storage.remove(team.id);
    }

    isFavoriteTeam(teamId){
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getallFavorites(){
        return new Promise(resolve => {
            let results = [];
            this.storage.forEach(data => {
                results.push(JSON.parse(data));
            });
            return resolve(results);
        });
    }
}