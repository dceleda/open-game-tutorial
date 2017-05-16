import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/range';

import { Item } from "./item";

@Injectable()
export class ItemService {

    constructor(private http: Http) { }

    private baseUrl = "api/items/";

    getLatest(num?: number) {
        return this.getItems("GetLatest/", num);
    }

    getMostViewed(num?: number) {
        return this.getItems("GetMostViewed/", num);
    }

    getRandom(num?: number) {
        return this.getItems("GetRandom/", num);
    }

    get(id: number) : Observable<any> {
        if (id == null) {
            throw new Error("id is required.");
        }

        var url = this.baseUrl + id;

        return this.http.get(url).map(resp => <Item>resp.json()).catch(err => { return this.handleError(err) });
    }

    private getItems(urlSuffix: string, num?:number) {
        var url = this.baseUrl + urlSuffix;
        if (num != null) { url += num; }
        return this.http.get(url).map(resp => resp.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        //console.error(error);
        debugger;
        console.error("Test");

        var testObs = Observable.range(1, 5);
        return Observable.throw("Server error");
    }
}