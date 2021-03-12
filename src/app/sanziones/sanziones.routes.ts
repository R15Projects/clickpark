import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { SanzionesComponent } from "./sanziones.component";
import {RegisterSanzionComponent} from "../components/register-sanzion/register-sanzion.component";
import {printComponent} from "../components/print/print.component";

const routes: Routes = [
    { path: "", component: SanzionesComponent },
    { path: "register", component: RegisterSanzionComponent },
    { path: "printer", component: printComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SanzionesRoutingModule { }
