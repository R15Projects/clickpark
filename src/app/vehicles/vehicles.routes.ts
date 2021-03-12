import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { VehiclesComponent } from "./vehicles.component";
import {RegisterSanzionComponent} from "../components/register-sanzion/register-sanzion.component";

const routes: Routes = [
    { path: "", component: VehiclesComponent },
    { path: "register/:id", component: RegisterSanzionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class VehiclesRoutingModule { }
