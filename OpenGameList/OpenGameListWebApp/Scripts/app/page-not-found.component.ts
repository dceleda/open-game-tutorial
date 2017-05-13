import { Component } from "@angular/core";

@Component({
    selector: "page-not-found",
    template: `
        <h2>{{title}}</h2>
        <div>
            Ooops... this page does not exist.
        </div>
    `
})
export class PageNotFoundComponent {
    title = "Page not Found";
}
