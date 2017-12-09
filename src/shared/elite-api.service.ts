import { Injectable } from "@angular/core";
import {Http, Response } from '@angular/http'

import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi {

    private baseURL = 'https://elite-schedule-app-i2-27bc4.firebaseio.com/';
    currentTourney: any = {};
    private tourneyData = {};

    constructor(private http: Http){}

    getTournaments(){

        return new Promise(resolve =>{
            this.http.get(`${this.baseURL}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }
    
    getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any>{
        if(!forceRefresh && this.tourneyData[tourneyId]){
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('[APP] - no need to amke HTTP request call, just need to reutrn the data');
            return Observable.of(this.currentTourney);
        }

        //if don't have data yet
        console.log('[APP] - about to make HTTP cal');
        return this.http.get(`${this.baseURL}/tournaments-data/${tourneyId}.json`)
        .map((response: Response) =>{
            this.tourneyData[tourneyId] = response.json()
            this.currentTourney = this.tourneyData[tourneyId];
            return this.currentTourney;
        });
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

    refreshCurrentTourney(){
        return this.getTournamentData(this.currentTourney.tournament.id, true)
    }
}