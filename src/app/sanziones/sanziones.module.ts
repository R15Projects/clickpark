import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { SanzionesComponent } from "./sanziones.component";
import { SanzionesRoutingModule } from "./sanziones.routes"
import {ComponentsModule} from "../components/components.module";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SanzionesRoutingModule,
        ComponentsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SanzionesComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SanzionesModule { }
