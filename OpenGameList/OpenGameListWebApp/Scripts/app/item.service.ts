import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
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

    add(item: Item) {
        var url = this.baseUrl;

        return this.http.post(url, JSON.stringify(item), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(item: Item) {
        var url = this.baseUrl + item.Id;

        return this.http.put(url, JSON.stringify(item), this.getRequestOptions())
            .map(resp => resp.json())
            .catch(this.handleError);
    }

    delete(id: number) {
        var url = this.baseUrl + id;

        return this.http.delete(url).catch(this.handleError);
    }

    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }

    private getItems(urlSuffix: string, num?:number) {
        var url = this.baseUrl + urlSuffix;
        if (num != null) { url += num; }
        return this.http.get(url).map(resp => resp.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}