System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, router_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                    this.title = "OpenGameList";
                }
                AppComponent.prototype.onAddClicked = function () {
                    var _this = this;
                    //this.router.navigateByUrl('/dummy', { skipLocationChange: true });
                    setTimeout(function () { return _this.router.navigate(['item', 0]); });
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: "opengamelist",
                    template: "<h1>{{title}}</h1>\n        <div class=\"menu\">\n            <a class=\"home\" [routerLink]=\"['']\">Home</a>\n            | <a class=\"about\" [routerLink]=\"['about']\">About</a>\n            | <a class=\"login\" [routerLink]=\"['login']\">Login</a>\n            | <a class=\"add\" (click)=\"onAddClicked()\">Add New</a>\n        </div>\n        <router-outlet></router-outlet>"
                }),
                __metadata("design:paramtypes", [router_1.Router])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map