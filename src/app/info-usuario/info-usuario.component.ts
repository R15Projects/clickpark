import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../models/usuarios/usuario.model";
import * as AppSettings from '@nativescript/core/application-settings';
import { RouterExtensions} from "@nativescript/angular";
import {vigilante} from "../../models/vigilantes/vigilante.model";

@Component({
	moduleId: module.id,
	selector: 'info-usuario',
	templateUrl: './info-usuario.component.html',
	styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {

    usuario: vigilante = JSON.parse(AppSettings.getString("_userInfo", JSON.stringify(<vigilante>{
        correo: "no esta logueado", nombre: "no esta logueado", numeroplaca: "no esta logueado"
    })));
	constructor(
	    private router: RouterExtensions,
    ) { }

    ngOnInit(): void {

    }

	onBack() {
	    this.router.back();
    }
}
