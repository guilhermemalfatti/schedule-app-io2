import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {
    //private db: any;
    constructor(private sqlite: SQLite) { }

    public getDB() {
        return this.sqlite.create({
          name: 'games.db',
          location: 'default'
        });
      }

    getAll(){
        return this.getDB().then((db: SQLiteObject) => {
            return db.executeSql('SELECT key, value FROM kv', []).then(data => {
                let results = [];
                for (let i = 0; i < data.rows.length; i++) {
                    results.push(JSON.parse(data.rows.item(i).value));
                }
                return results;
            });
        });
        
    }

    get(key: string){
        return this.getDB().then((db: SQLiteObject) => {
            return db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
                if (data.rows.length > 0) {
                    return JSON.parse(data.rows.item(0).value);
                }
            });
        });

    }

    remove(key: string){
        return this.getDB().then((db: SQLiteObject) => {
            return db.executeSql('delete from kv where key = ?', [key]);
        });
    }

    set(key: string, value: string){
        return this.getDB().then((db: SQLiteObject) => {
            return db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
                if (data.rows.length > 0) {
                    return JSON.parse(data.rows.item(0).value);
                }
            });
        });

    }
    
    /**
     * Should be called after deviceready event is fired
     */
    public initializeDatabase(){
               
        console.log('[APP]SQLite plugin  installed.');
        return this.getDB().then((db) => {
            return db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []).then(data => {
                console.log('**after CREATE TABLE check', data);
            });
        });
    }
}