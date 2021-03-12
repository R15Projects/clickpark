import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core";
import {RouterExtensions} from "@nativescript/angular";
import * as AppSettings from "@nativescript/core/application-settings";
import {vigilante} from "../../models/vigilantes/vigilante.model";
@Component({
	selector: 'principal',
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
    usuario: vigilante = JSON.parse(AppSettings.getString("_userInfo", JSON.stringify(<vigilante>{
        correo: "no esta logueado", nombre: "no esta logueado", numeroplaca: "no esta logueado"
    })));
    signinAvailable = true;
	constructor(
	    private route: RouterExtensions,
	    page: Page
    ) {
	    page.actionBarHidden = true;
    }

	ngOnInit() {
	    if(this.usuario.id) {
	        this.signinAvailable = false;
        }
    }

    async iniciarSesion() {
	    this.route.navigateByUrl("/sign");
    }

    async salir() {
	    AppSettings.remove("_userInfo");
	    this.signinAvailable = true;
    }
}
