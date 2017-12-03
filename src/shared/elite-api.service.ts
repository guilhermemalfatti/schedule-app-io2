import { Injectable } from "@angular/core";
import {Http, Response } from '@angular/http'

@Injectable()
export class EliteApi {

    private baseURL = 'https://elite-schedule-app-i2-27bc4.firebaseio.com/';

    constructor(private http: Http){}

    getTournaments(){

        return new Promise(resolve =>{
            this.http.get(`${this.baseURL}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }
}