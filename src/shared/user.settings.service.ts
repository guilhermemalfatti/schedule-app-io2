import { Injectable } from "@angular/core";
import {Events} from 'ionic-angular';
import { SqlStorage } from './shared';
import { SQLite} from '@ionic-native/sqlite';

@Injectable()
//TODO test whether there is SQLite, in order to use in emulator
export class UserSettings {
    sql = new SqlStorage(new SQLite());
    constructor(private events: Events){ }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName}

        this.sql.set(team.id, JSON.stringify(item));
        console.log('[APP] user.settings - favorite team - publish event');
        this.events.publish('favorite:change');
    }

    unfavoriteTeam(team){
        this.sql.remove(team.id);
        console.log('[APP] user.settings - unfavorite team - publish event');
        this.events.publish('favorite:change');
    }

    isFavoriteTeam(teamId){
        return this.sql.get(teamId).then(value => value ? true : false);
    }

    getallFavorites(){
        /* let results = [];
            this.storage.forEach((data, key, index) => {
                results.push(JSON.parse(data));
            }).then(() => {
                return resolve(results);
            });     */  
            

        return this.sql.getAll();  
    }

    public initStorage(){
        return this.sql.initializeDatabase();        
    }
}