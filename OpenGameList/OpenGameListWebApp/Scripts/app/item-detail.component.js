System.register(["@angular/core", "@angular/router", "./item", "./item.service"], function (exports_1, context_1) {
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
    var core_1, router_1, item_1, item_service_1, ItemDetailComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }
        ],
        execute: function () {
            ItemDetailComponent = (function () {
                function ItemDetailComponent(itemService, router, activatedRoute) {
                    this.itemService = itemService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ItemDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this.activatedRoute.snapshot.params['id'];
                    if (id) {
                        this.itemService.get(id).subscribe(function (item) { return _this.item = item; });
                        console.log(this.item);
                    }
                    else if (id === 0) {
                        console.log("id is 0: add new ...");
                        this.item = new item_1.Item(0, "New Item", null);
                    }
                    else {
                        console.log("Invalid id ...");
                        this.router.navigate([""]);
                    }
                };
                ItemDetailComponent.prototype.onInsert = function (item) {
                    var _this = this;
                    this.itemService.add(item).subscribe(function (data) {
                        _this.item = data;
                        console.log("Item " + _this.item.Id + " has been added.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailComponent.prototype.onUpdate = function (item) {
                    var _this = this;
                    this.itemService.update(item).subscribe(function (data) {
                        _this.item = data;
                        console.log("Item " + _this.item.Id + " has been updated.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailComponent.prototype.onDelete = function (item) {
                    var _this = this;
                    var id = item.Id;
                    this.itemService.delete(id).subscribe(function (data) {
                        console.log("Item " + item.Id + " has been deleted.");
                        _this.router.navigate([""]);
                    }, function (error) { return console.log(error); });
                };
                ItemDetailComponent.prototype.onBack = function () {
                    this.router.navigate([""]);
                };
                return ItemDetailComponent;
            }());
            ItemDetailComponent = __decorate([
                core_1.Component({
                    selector: "item-detail",
                    template: "\n        <div *ngIf=\"item\" class=\"item-details\">\n            <h2>{{item.Title}} - Detail View</h2>\n            <ul>\n                <li>\n                    <label>Title:</label>\n                    <input [(ngModel)]=\"item.Title\" placeholder=\"Insert the title ...\" />\n                </li>\n                <li>\n                    <label>Description:</label>\n                    <textarea [(ngModel)]=\"item.Description\" placeholder=\"Insert a suitable description...\" ></textarea>\n                </li>\n            </ul>\n            <div *ngIf=\"item.Id == 0\" class=\"commands insert\">\n                <input type=\"button\" value=\"Save\" (click)=\"onInsert(item)\" />\n                <input type=\"button\" value=\"Cancel\" (click)=\"onBack()\" />\n            </div>\n            <div *ngIf=\"item.Id != 0\" class=\"command update\">\n                <input type=\"button\" value=\"Update\" (click)=\"onUpdate(item)\" />\n                <input type=\"button\" value=\"Delete\" (click)=\"onDelete(item)\" />\n                <input type=\"button\" value=\"Back\" (click)=\"onBack()\" />\n            </div>\n        </div>",
                    styles: ["\n        .item-details{\n            margin:5px;\n            padding:5px 10px;\n            border: 1px solid black;\n            background-color: #dddddd;\n            width: 300px;\n        }\n        .item-details * {\n            vertical-align: middle;\n        }\n        .item-details ul li{\n            padding: 5x 0;\n        }"]
                }),
                __metadata("design:paramtypes", [item_service_1.ItemService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ItemDetailComponent);
            exports_1("ItemDetailComponent", ItemDetailComponent);
        }
    };
});
//# sourceMappingURL=item-detail.component.js.map