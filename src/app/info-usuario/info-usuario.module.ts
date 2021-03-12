import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {ModalDialogService, NativeScriptCommonModule, NativeScriptFormsModule} from "@nativescript/angular";
import { InfoUsuarioComponent } from "./info-usuario.component";
import { InfoUsuarioRoutingModule } from "./info-usuario.routes"
import {ComponentsModule} from "../components/components.module";


@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        InfoUsuarioRoutingModule,
        ComponentsModule,
    ],
    declarations: [
        InfoUsuarioComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InfoUsuarioModule { }
