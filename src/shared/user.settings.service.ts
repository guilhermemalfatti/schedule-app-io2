import { Injectable } from "@angular/core";
import {Events} from 'ionic-angular';
import { SqlStorage } from './shared';
import { SQLite} from '@ionic-native/sqlite';
import {Storage} from '@ionic/storage';

const win: any = window;

@Injectable()
export class UserSettings {
    sql: any;
    constructor(private events: Events,
                public storage: Storage,){ 
                    if(win.sqlitePlugin){
                        this.sql = new SqlStorage(new SQLite());
                    }
                }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName}

        if(win.sqlitePlugin){
            this.sql.set(team.id, JSON.stringify(item));
        }else{
            this.storage.set(team.id, JSON.stringify(item));
        }
        
        console.log('[APP] user.settings - favorite team - publish event');
        this.events.publish('favorite:change');
    }

    unfavoriteTeam(team){
        if(win.sqlitePlugin){
            this.sql.remove(team.id);
        }else{
            this.storage.remove(team.id);
        }
        
        console.log('[APP] user.settings - unfavorite team - publish event');
        this.events.publish('favorite:change');
    }

    isFavoriteTeam(teamId){
        if(win.sqlitePlugin){
            return this.sql.get(teamId).then(value => value ? true : false);
        }else{
            return this.storage.get(teamId).then(value => value ? true : false);
        }        
    }

    getallFavorites(){
        if(win.sqlitePlugin){
            return this.sql.getAll();
        }else{
            return new Promise(resolve => {
                let results = [];
                this.storage.forEach((data, key, index) => {
                    results.push(JSON.parse(data));
                }).then(() => {
                    return resolve(results);
                });
            });
        }
    }

    public initStorage(){
        if(win.sqlitePlugin){
            return this.sql.initializeDatabase();
        }else{
            console.warn('[APP]SQLite plugin not installed. Falling back to regular Ionic Storage.');
            return new Promise(resolve => {
                resolve();
            });            
        }
    }
}