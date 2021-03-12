import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {ModalDialogService, NativeScriptCommonModule} from "@nativescript/angular";
import { VehiclesComponent } from "./vehicles.component";
import { VehiclesRoutingModule } from "./vehicles.routes";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {ComponentsModule} from "../components/components.module";
import {RegisterVehicleComponent} from "../components/register-vehicle/register-vehicle.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        VehiclesRoutingModule,
        ComponentsModule
    ],
    declarations: [
        VehiclesComponent
    ],
    providers: [
        ModalDialogService
    ],
    entryComponents: [
        RegisterVehicleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VehiclesModule { }
