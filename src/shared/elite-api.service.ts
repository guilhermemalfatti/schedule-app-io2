import { Injectable } from "@angular/core";
import {Http, Response } from '@angular/http'

@Injectable()
export class EliteApi {

    private baseURL = 'https://elite-schedule-app-i2-27bc4.firebaseio.com/tournaments-data';
    
    constructor(private http: Http){}
}