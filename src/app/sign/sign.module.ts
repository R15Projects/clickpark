import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {NativeScriptCommonModule, NativeScriptFormsModule} from "@nativescript/angular";
import { SignComponent } from "./sign.component"
import { SignRoutingModule } from "./sign.routes"

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SignComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignModule { }
