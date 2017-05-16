System.register(["@angular/core", "@angular/http", "rxjs/Rx", "rxjs/add/operator/do", "rxjs/add/operator/catch", "rxjs/add/operator/map", "rxjs/add/observable/throw", "rxjs/add/observable/range"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Rx_1, ItemService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            }
        ],
        execute: function () {
            ItemService = (function () {
                function ItemService(http) {
                    this.http = http;
                    this.baseUrl = "api/items/";
                }
                ItemService.prototype.getLatest = function (num) {
                    return this.getItems("GetLatest/", num);
                };
                ItemService.prototype.getMostViewed = function (num) {
                    return this.getItems("GetMostViewed/", num);
                };
                ItemService.prototype.getRandom = function (num) {
                    return this.getItems("GetRandom/", num);
                };
                ItemService.prototype.get = function (id) {
                    var _this = this;
                    if (id == null) {
                        throw new Error("id is required.");
                    }
                    var url = this.baseUrl + id;
                    return this.http.get(url).map(function (resp) { return resp.json(); }).catch(function (err) { return _this.handleError(err); });
                };
                ItemService.prototype.getItems = function (urlSuffix, num) {
                    var url = this.baseUrl + urlSuffix;
                    if (num != null) {
                        url += num;
                    }
                    return this.http.get(url).map(function (resp) { return resp.json(); }).catch(this.handleError);
                };
                ItemService.prototype.handleError = function (error) {
                    //console.error(error);
                    debugger;
                    console.error("Test");
                    var testObs = Rx_1.Observable.range(1, 5);
                    return Rx_1.Observable.throw("Server error");
                };
                return ItemService;
            }());
            ItemService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], ItemService);
            exports_1("ItemService", ItemService);
        }
    };
});
//# sourceMappingURL=item.service.js.map