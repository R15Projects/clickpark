import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import {AboutComponent} from "./about.component";
import {AboutRoutingModule} from "./about.routes";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AboutRoutingModule
    ],
    declarations: [
        AboutComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AboutModule { }
