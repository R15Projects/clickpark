import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    ModalDialogService,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule, NativeScriptRouterModule
} from "@nativescript/angular";
import { RegisterVehicleComponent } from "./register-vehicle/register-vehicle.component";
import {RegisterSanzionComponent} from "./register-sanzion/register-sanzion.component";
import {TNSCheckBoxModule} from "@nstudio/nativescript-checkbox/angular";
import {SelectDatepickerComponent} from "./select-datepicke/select-datepicker.component";
import {printComponent} from "./print/print.component";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";

@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        TNSCheckBoxModule,
        NativeScriptRouterModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        RegisterVehicleComponent,
        RegisterSanzionComponent,
        SelectDatepickerComponent,
        printComponent
    ],
    exports: [
        RegisterVehicleComponent,
        RegisterSanzionComponent,
        SelectDatepickerComponent,
        printComponent
    ],
    providers: [
        ModalDialogService
    ],
    entryComponents: [
        SelectDatepickerComponent
    ]
})

export class ComponentsModule { }
